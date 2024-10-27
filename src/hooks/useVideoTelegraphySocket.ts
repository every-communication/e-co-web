/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";

import { JOINED_ROOM_EVENT_NAME, LEFT_ROOM_EVENT_NAME } from "@/common/constants/events";
import { useToast } from "@/components/Common/Toast";
import type {
	BaseVideoTelegraphyServerEvent,
	ServerAnswerData,
	ServerCandidateData,
	ServerOfferData,
	ServerTranslatedData,
	SocketConnectState,
	VideoTelegraphyServerEventMap,
} from "@/utils/videoTelegraphy/types";
import VideoTelegraphySocket from "@/utils/videoTelegraphy/videoTelegraphySocket";

import useMe from "./useMe";

interface JoinedRoomArgs {
	localVideoElement: HTMLVideoElement;
	oppositeVideoElement: HTMLVideoElement;
}

interface TranslatedArgs {
	translatedCallback: (args: ServerTranslatedData) => void;
}

type EventListenerArgs = JoinedRoomArgs & TranslatedArgs;

export interface ReturnUseVideoTelegraphySocket {
	connectState: SocketConnectState;
	setUpLocalStream: (el: HTMLVideoElement) => Promise<MediaStream | undefined>;
	clearLocalStream: () => void;
	getRoomList: () => void;
	createRoom: () => void;
	createWebSocket: () => void;
	joinRoom: () => void;
	leaveRoom: () => void;
	sendTranslation: (message: string) => void;
	addEventListener: (args: EventListenerArgs) => void;
	close: () => void;
}

export const useVideoTelegraphySocket = (room: string): ReturnUseVideoTelegraphySocket => {
	const { me } = useMe();
	const { addToast } = useToast();

	const [videoTelegraphy] = useState(() => new VideoTelegraphySocket(room, me.id));
	const localStream = useRef<MediaStream | undefined>(undefined);

	const [connectState, setConnectState] = useState<SocketConnectState>("CLOSED");

	const getRoomList = useCallback(() => {
		videoTelegraphy.getRoomList();
	}, [videoTelegraphy]);

	const createRoom = useCallback(() => {
		videoTelegraphy.createRoom();
	}, [videoTelegraphy]);

	const joinRoom = useCallback(() => {
		videoTelegraphy.joinRoom();
	}, [videoTelegraphy]);

	const leaveRoom = useCallback(() => {
		videoTelegraphy.leaveRoom();
	}, [videoTelegraphy]);

	const sendTranslation = useCallback(
		(message: string) => {
			videoTelegraphy.sendTranslation(message);
		},
		[videoTelegraphy],
	);

	const createWebSocket = useCallback(() => {
		videoTelegraphy.createWebSocket({ handleConnectState: setConnectState });
	}, [videoTelegraphy]);

	const setUpLocalStream = useCallback(
		async (el: HTMLVideoElement) => {
			try {
				const localMediaStream = await navigator.mediaDevices.getUserMedia({
					video: { width: { ideal: 1280, max: 1920 }, height: { ideal: 720, max: 1080 } },
					audio: true,
				});
				localStream.current = localMediaStream;
				el.srcObject = localStream.current;
				el.autoplay = true;
				el.muted = true;

				return localMediaStream;
			} catch (err) {
				if (err instanceof DOMException && err.name === "NotAllowedError") {
					addToast({ message: "카메라 권한을 허용해주세요.", state: "negative" });
				}
				if (err instanceof DOMException && err.name === "OverconstrainedError") {
					addToast({ message: "해당 카메라 해상도는 지원하지 않습니다.", state: "negative" });
				}
				console.log(err);
			}
		},
		[addToast],
	);

	const clearLocalStream = useCallback(() => {
		if (localStream.current) {
			localStream.current.getTracks().forEach((track) => track.stop());
			localStream.current = undefined;
		}
	}, []);

	const handleRemoteStream = useCallback(
		(el: HTMLVideoElement) => (event: RTCTrackEvent) => {
			el.srcObject = event.streams[0];
			el.playsInline = true;
			el.autoplay = true;
			el.muted = false;
		},
		[],
	);

	const createPeerConnection = useCallback(
		(args: JoinedRoomArgs) => {
			videoTelegraphy.createPeerConnection(handleRemoteStream(args.oppositeVideoElement));

			if (localStream.current) {
				localStream.current
					.getTracks()
					.forEach((track) => videoTelegraphy.peerConnection!.addTrack(track, localStream.current!));
			}
		},
		[handleRemoteStream, videoTelegraphy],
	);

	const joinedRoomHandler = useCallback(
		async (data: BaseVideoTelegraphyServerEvent<"joinedRoom"> & JoinedRoomArgs) => {
			if (data.room.code !== room) return;
			const { user1Id, user2Id } = data.room;
			window.dispatchEvent(new CustomEvent(JOINED_ROOM_EVENT_NAME));
			if (user1Id && user2Id) {
				createPeerConnection(data);
				await videoTelegraphy.sendOffer();
			}
		},
		[createPeerConnection, room, videoTelegraphy],
	);

	const offerHandler = useCallback(
		async (args: ServerOfferData & JoinedRoomArgs) => {
			createPeerConnection(args);
			await videoTelegraphy.setRemoteOfferDescription(args.offer);
			await videoTelegraphy.sendAnswer();
		},
		[createPeerConnection, videoTelegraphy],
	);

	const answerHandler = useCallback(
		async (args: ServerAnswerData) => {
			if (!videoTelegraphy.peerConnection) return;

			const setRemoteDescription = async () => {
				try {
					await videoTelegraphy.peerConnection!.setRemoteDescription(new RTCSessionDescription(args.answer));
					await videoTelegraphy.setRemoteAnswerDescription(args.answer);
				} catch (error) {
					console.error("Failed to set remote description:", error);
				}
			};

			if (videoTelegraphy.peerConnection.signalingState === "have-local-offer") {
				void (await setRemoteDescription());
			}

			if (videoTelegraphy.peerConnection.signalingState === "stable") return;

			videoTelegraphy.peerConnection.addEventListener("signalingstatechange", async () => {
				if (videoTelegraphy.peerConnection?.signalingState === "stable") {
					await setRemoteDescription();
					videoTelegraphy.peerConnection.removeEventListener("signalingstatechange", setRemoteDescription);
				}
			});

			return () => {
				videoTelegraphy.peerConnection?.removeEventListener("signalingstatechange", setRemoteDescription);
			};
		},
		[videoTelegraphy],
	);

	const candidateHandler = useCallback(
		async (args: ServerCandidateData) => {
			await videoTelegraphy.peerConnection?.addIceCandidate(new RTCIceCandidate(args.candidate));
		},
		[videoTelegraphy.peerConnection],
	);

	const participantLeftHandler = useCallback(
		(args: VideoTelegraphyServerEventMap["participantLeft"] & JoinedRoomArgs) => {
			if (args.room.code !== room) return;
			window.dispatchEvent(new CustomEvent(LEFT_ROOM_EVENT_NAME));
			videoTelegraphy.peerConnection?.close();
			videoTelegraphy.peerConnection = null;
			args.oppositeVideoElement.srcObject = null;
		},
		[room, videoTelegraphy],
	);

	const translatedHandler = useCallback((args: VideoTelegraphyServerEventMap["translated"] & TranslatedArgs) => {
		if (!args.message) return;
		args.translatedCallback({ message: args.message });
	}, []);

	const close = useCallback(() => {
		videoTelegraphy.close();
	}, [videoTelegraphy]);

	const addEventListener = useCallback(
		(args: EventListenerArgs) => {
			videoTelegraphy.webSocket?.addEventListener("message", async (event) => {
				const eventData = JSON.parse(event.data) as any;
				const { type, ...data } = eventData;
				console.info("Received message", eventData);

				switch (type) {
					case "joinedRoom":
						await joinedRoomHandler({
							...data,
							localVideoElement: args.localVideoElement,
							oppositeVideoElement: args.oppositeVideoElement,
						} as BaseVideoTelegraphyServerEvent<"joinedRoom"> & JoinedRoomArgs);
						break;

					case "offer":
						await offerHandler({
							...data,
							localVideoElement: args.localVideoElement,
							oppositeVideoElement: args.oppositeVideoElement,
						} as ServerOfferData & JoinedRoomArgs);
						break;

					case "answer":
						await answerHandler(data as ServerAnswerData);
						break;

					case "candidate":
						await candidateHandler(data as ServerCandidateData);
						break;

					case `translated-${me.id}-${room}`:
						translatedHandler({ ...data, translatedCallback: args.translatedCallback });
						break;

					case "participantLeft":
						participantLeftHandler({
							...data,
							localVideoElement: args.localVideoElement,
							oppositeVideoElement: args.oppositeVideoElement,
						} as VideoTelegraphyServerEventMap["participantLeft"] & JoinedRoomArgs);
						break;

					default:
						break;
				}
			});
		},
		[
			answerHandler,
			candidateHandler,
			joinedRoomHandler,
			me.id,
			offerHandler,
			participantLeftHandler,
			room,
			translatedHandler,
			videoTelegraphy.webSocket,
		],
	);

	return {
		connectState,
		setUpLocalStream,
		clearLocalStream,
		sendTranslation,
		createWebSocket,
		createRoom,
		addEventListener,
		getRoomList,
		joinRoom,
		leaveRoom,
		close,
	};
};
