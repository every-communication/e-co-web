import type { VideoTelegraphyClientEventData, VideoTelegraphyClientEvents } from "./types";
import config from "@/config";

export const SIGNALING_SERVER_URL = config.SIGNALING_API_URL;
export const MAX_RECONNECT_COUNT = 5;

const ICE_STUN_SERVER = "stun:stun.l.google.com:19302";

class VideoTelegraphySocket {
	#room: string;
	#userId: number;
	peerConnection: RTCPeerConnection | null = null;
	webSocket: WebSocket | null = null;

	constructor(room: string, userId: number) {
		this.#room = room;
		this.#userId = userId;
	}

	createRoom() {
		this.emitEvent({ type: "createRoom" });
	}

	getRoomList() {
		this.emitEvent({ type: "getRooms" });
	}

	joinRoom() {
		this.emitEvent({ type: "joinRoom", room: this.#room });
	}

	leaveRoom() {
		this.emitEvent({ type: "leaveRoom", room: this.#room });
	}

	async sendOffer() {
		if (!this.checkIsPeerConnection(this.peerConnection)) return;
		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(offer);
		this.emitEvent({ type: "offer", offer, room: this.#room });
	}

	async sendAnswer() {
		if (!this.checkIsPeerConnection(this.peerConnection)) return;
		const answer = await this.peerConnection.createAnswer();
		await this.peerConnection.setLocalDescription(answer);
		this.emitEvent({ type: "answer", answer, room: this.#room });
	}

	createPeerConnection(handleRemoteStream: (event: RTCTrackEvent) => void) {
		console.log("createPeerConnection...");
		this.peerConnection = new RTCPeerConnection({ iceServers: [{ urls: ICE_STUN_SERVER }] });

		this.peerConnection.onicegatheringstatechange = (event) => {
			console.log("ICE gathering state changed:", this.peerConnection!.iceGatheringState);
		};

		this.peerConnection.onicecandidate = (event) => {
			this.emitEvent({ type: "candidate", candidate: event.candidate!, room: this.#room });
		};

		this.peerConnection.ontrack = (event) => {
			handleRemoteStream(event);
		};

		console.log(this.peerConnection);
	}

	checkIsWebSocketOpen() {
		return this.webSocket?.readyState === WebSocket.OPEN;
	}

	checkIsPeerConnection(peerConnection: RTCPeerConnection | null): peerConnection is RTCPeerConnection {
		return Boolean(peerConnection);
	}

	checkIsPeerConnectionConnect() {
		return this.peerConnection?.connectionState === "connected";
	}

	close() {
		this.webSocket?.close();
		this.peerConnection?.close();
	}

	private emitEvent<T extends VideoTelegraphyClientEvents>(data: VideoTelegraphyClientEventData<T>) {
		if (!this.checkIsWebSocketOpen()) return;
		this.webSocket?.send(JSON.stringify({ ...data, userId: this.#userId }));
	}
}

export default VideoTelegraphySocket;
