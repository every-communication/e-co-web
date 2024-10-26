/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";

import { JOINED_ROOM_EVENT_NAME, LEFT_ROOM_EVENT_NAME } from "@/common/constants/events";
import { useGetRoomQuery } from "@/queries/videoTelegraphy/queries";
import {
	BaseVideoTelegraphyServerEvent,
	ServerAnswerData,
	ServerCandidateData,
	ServerOfferData,
	VideoTelegraphyServerEventMap,
} from "@/utils/videoTelegraphy/types";
import VideoTelegraphySocket, { SIGNALING_SERVER_URL } from "@/utils/videoTelegraphy/videoTelegraphySocket";

import useMe from "./useMe";

interface JoinedRoomArgs {
	localVideoElement: HTMLVideoElement;
	oppositeVideoElement: HTMLVideoElement;
}

interface EventListenerArgs extends JoinedRoomArgs {}

export interface ReturnUseVideoTelegraphySocket {
	connectState: number;
	getRoomList: () => void;
	createRoom: () => void;
	createWebSocket: () => void;
	joinRoom: () => void;
	leaveRoom: () => void;
	addEventListener: (args: EventListenerArgs) => void;
	close: () => void;
}

// TODO: update
export const useVideoTelegraphySocket = (room: string): ReturnUseVideoTelegraphySocket => {
	const { me } = useMe();
	const [reconnectCount, setReconnectCount] = useState(0);
	const [videoTelegraphy] = useState(() => new VideoTelegraphySocket(room, me.id));
	const localStream = useRef<MediaStream | undefined>(undefined);

	const [connectState, setConnectState] = useState<number>(WebSocket.CLOSED);

	const { refetch: getRoom } = useGetRoomQuery(room);

	const createWebSocket = useCallback(() => {
		videoTelegraphy.webSocket = new WebSocket(SIGNALING_SERVER_URL);

		videoTelegraphy.webSocket.onopen = () => {
			setReconnectCount(0);
			setConnectState(WebSocket.OPEN);
		};

		videoTelegraphy.webSocket.onclose = (event) => {
			console.log("WebSocket connection closed", event);
			setConnectState(WebSocket.CLOSED);

			if (reconnectCount < 5) {
				setReconnectCount((prev) => prev + 1);
				setTimeout(() => createWebSocket(), 1000);
			} else {
				console.log("Max reconnect attempts reached");
			}
		};

		videoTelegraphy.webSocket.onerror = (error) => {
			console.error("WebSocket error:", error);
			videoTelegraphy.webSocket?.close();
		};
	}, [reconnectCount, videoTelegraphy]);

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

	const setUpLocalStream = useCallback(async (el: HTMLVideoElement) => {
		try {
			const localMediaStream = await navigator.mediaDevices.getUserMedia({
				video: { width: { min: 1024, ideal: 1280, max: 1920 }, height: { min: 576, ideal: 720, max: 1080 } },
				audio: true,
			});
			localStream.current = localMediaStream;
			el.srcObject = localStream.current;
			el.autoplay = true;
			el.muted = true;

			return localStream;
		} catch (err) {
			console.log(err);
		}
	}, []);

	const handleRemoteStream = useCallback(
		(el: HTMLVideoElement) => (event: RTCTrackEvent) => {
			console.log({ remoteStream: el, event });
			el.srcObject = event.streams[0];
			el.playsInline = true;
			el.autoplay = true;
			el.muted = false;
		},
		[],
	);

	const createPeerConnection = useCallback(
		async (args: JoinedRoomArgs) => {
			console.log("Creating peer connection");
			videoTelegraphy.createPeerConnection(handleRemoteStream(args.oppositeVideoElement));
			await setUpLocalStream(args.localVideoElement);
			if (localStream.current) {
				localStream.current
					.getTracks()
					.forEach((track) => videoTelegraphy.peerConnection!.addTrack(track, localStream.current!));
			}
		},
		[handleRemoteStream, setUpLocalStream, videoTelegraphy],
	);

	const joinedRoomHandler = useCallback(
		async (data: BaseVideoTelegraphyServerEvent<"joinedRoom"> & JoinedRoomArgs) => {
			const { data: roomInfoData } = await getRoom();
			if (!roomInfoData) return;
			const { user1Id, user2Id } = roomInfoData.data;
			await setUpLocalStream(data.localVideoElement);
			window.dispatchEvent(new CustomEvent(JOINED_ROOM_EVENT_NAME));
			if (user1Id && user2Id) {
				createPeerConnection(data);
				if (user1Id === me.id) videoTelegraphy.sendOffer();
			}
		},
		[createPeerConnection, getRoom, me.id, setUpLocalStream, videoTelegraphy],
	);

	const offerHandler = useCallback(
		async (args: ServerOfferData & JoinedRoomArgs) => {
			await createPeerConnection(args);
			await videoTelegraphy.peerConnection?.setRemoteDescription(new RTCSessionDescription(args.offer));
			await videoTelegraphy.sendAnswer();
		},
		[createPeerConnection, videoTelegraphy],
	);

	const answerHandler = useCallback(
		async (args: ServerAnswerData) => {
			await videoTelegraphy.peerConnection?.setRemoteDescription(new RTCSessionDescription(args.answer));
		},
		[videoTelegraphy.peerConnection],
	);

	const candidateHandler = useCallback(
		async (args: ServerCandidateData) => {
			await videoTelegraphy.peerConnection?.addIceCandidate(new RTCIceCandidate(args.candidate));
		},
		[videoTelegraphy.peerConnection],
	);

	const participantLeftHandler = useCallback(
		(args: VideoTelegraphyServerEventMap["participantLeft"] & JoinedRoomArgs) => {
			window.dispatchEvent(new CustomEvent(LEFT_ROOM_EVENT_NAME));
			videoTelegraphy.peerConnection?.close();
			videoTelegraphy.peerConnection = null;
			args.oppositeVideoElement.srcObject = null;
		},
		[videoTelegraphy],
	);

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
			offerHandler,
			participantLeftHandler,
			videoTelegraphy.webSocket,
		],
	);

	return {
		connectState,
		createWebSocket,
		createRoom,
		addEventListener,
		getRoomList,
		joinRoom,
		leaveRoom,
		close,
	};
};
