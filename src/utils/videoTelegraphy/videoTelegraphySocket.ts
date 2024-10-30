import type { CreateWebSocketArgs, VideoTelegraphyClientEventData, VideoTelegraphyClientEvents } from "./types";
import config from "@/config";

const MAX_RECONNECT_COUNT = 5;
const SIGNALING_SERVER_URL = config.SIGNALING_API_URL;

export const ICE_STUN_SERVER = "stun:stun.l.google.com:19302";

class VideoTelegraphySocket {
	#room: string;
	#userId: number;
	#reconnectCount = 0;
	peerConnection: RTCPeerConnection | null = null;
	webSocket: WebSocket | null = null;

	constructor(room: string, userId: number) {
		this.#room = room;
		this.#userId = userId;
	}

	emitCreateRoom() {
		this.emitEvent({ type: "createRoom" });
	}

	emitGetRoomList() {
		this.emitEvent({ type: "getRooms" });
	}

	emitJoinRoom() {
		this.emitEvent({ type: "joinRoom", room: this.#room });
	}

	emitLeaveRoom() {
		this.emitEvent({ type: "leaveRoom", room: this.#room });
	}

	emitSendTranslation(message: string) {
		this.emitEvent({ type: "translation", message, room: this.#room });
	}

	createWebSocket({ handleConnectState }: CreateWebSocketArgs) {
		this.webSocket = new WebSocket(SIGNALING_SERVER_URL);

		this.webSocket.onopen = () => {
			this.#reconnectCount = 0;
			handleConnectState("OPEN");
		};

		this.webSocket.onclose = () => {
			handleConnectState("CLOSED");

			if (this.#reconnectCount < MAX_RECONNECT_COUNT) {
				this.#reconnectCount += 1;
				setTimeout(() => this.createWebSocket({ handleConnectState }), 1000);
			} else {
				console.log("Max reconnect attempts reached");
			}
		};

		this.webSocket.onerror = () => {
			handleConnectState("CLOSING");
			this.webSocket?.close();
			this.createWebSocket({ handleConnectState });
		};
	}

	createPeerConnection(handleRemoteStream: (event: RTCTrackEvent) => void) {
		this.peerConnection = new RTCPeerConnection({ iceServers: [{ urls: ICE_STUN_SERVER }] });

		this.peerConnection.onicecandidate = (event) => {
			if (event.candidate) {
				this.emitEvent({ type: "candidate", candidate: event.candidate, room: this.#room });
			}
		};

		this.peerConnection.ontrack = handleRemoteStream;
	}

	async setRemoteOfferDescription(offer: RTCSessionDescriptionInit) {
		if (!this.checkIsPeerConnection(this.peerConnection)) return;
		await this.peerConnection.setRemoteDescription(offer);
	}

	async setRemoteAnswerDescription(answer: RTCSessionDescriptionInit) {
		if (!this.checkIsPeerConnection(this.peerConnection)) return;
		await this.peerConnection.setRemoteDescription(answer);
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
		if (this.peerConnection) {
			this.peerConnection.getSenders().forEach((sender) => {
				if (sender.track) {
					sender.track.stop();
				}
			});

			this.peerConnection.close();
			this.peerConnection = null;
		}

		if (this.webSocket) {
			if (this.webSocket.readyState === WebSocket.OPEN) {
				this.webSocket.close();
			}
			this.webSocket = null;
		}
	}

	private emitEvent<T extends VideoTelegraphyClientEvents>(data: VideoTelegraphyClientEventData<T>) {
		if (!this.checkIsWebSocketOpen()) return;
		this.webSocket?.send(JSON.stringify({ ...data, userId: this.#userId }));
	}
}

export default VideoTelegraphySocket;
