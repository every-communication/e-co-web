import type { RoomDTO } from "@/common/types/videoTelegraphy";

export const VIDEO_TELEGRAPHY_EVENT_MAPPER = {};

// MEMO: SERVER EVENTS
export type VideoTelegraphyServerEvents =
	| "joinedRoom"
	| "participantLeft"
	| "roomList"
	| "error"
	| "answer"
	| "candidate"
	| "offer";

interface ServerJoinedRoomData extends RoomDTO {}

interface ServerParticipantLeftData {
	room: RoomDTO;
	/** 본인 ID */
	userId: number;
}

interface ServerRoomListData {
	rooms: RoomDTO[];
}

interface ServerErrorData {
	message: string;
}

export interface ServerOfferData {
	offer: RTCSessionDescriptionInit;
}

export interface ServerAnswerData {
	answer: RTCSessionDescriptionInit;
}

export interface ServerCandidateData {
	candidate: RTCIceCandidate;
}

export interface VideoTelegraphyServerEventMap {
	joinedRoom: ServerJoinedRoomData;
	participantLeft: ServerParticipantLeftData;
	roomList: ServerRoomListData;
	error: ServerErrorData;
	offer: ServerOfferData;
}

type GetServerEventData<T extends VideoTelegraphyServerEvents> = T extends keyof VideoTelegraphyServerEventMap
	? VideoTelegraphyServerEventMap[T]
	: never;

export type BaseVideoTelegraphyServerEvent<T extends VideoTelegraphyServerEvents> =
	T extends keyof VideoTelegraphyServerEventMap
		? {
				type: T;
			} & GetServerEventData<T>
		: never;

// MEMO: CLIENT EVENTS
export type VideoTelegraphyClientEvents =
	| "createRoom"
	| "getRooms"
	| "joinRoom"
	| "leaveRoom"
	| "offer"
	| "answer"
	| "candidate";

interface ClientJoinRoomData {
	room: string;
}

interface ClientLeaveRoom {
	room: string;
}

interface ClientOfferData {
	room: string;
	offer: RTCSessionDescriptionInit;
}

interface ClientAnswerData {
	room: string;
	answer: RTCSessionDescriptionInit;
}

interface ClientCandidateData {
	room: string;
	candidate: RTCIceCandidate;
}

export interface VideoTelegraphyClientEventMap {
	joinRoom: ClientJoinRoomData;
	leaveRoom: ClientLeaveRoom;
	offer: ClientOfferData;
	answer: ClientAnswerData;
	candidate: ClientCandidateData;
	getRooms: {};
	createRoom: {};
}

type GetClientEventData<T extends VideoTelegraphyClientEvents> = T extends keyof VideoTelegraphyClientEventMap
	? VideoTelegraphyClientEventMap[T]
	: never;

export type VideoTelegraphyClientEventData<T extends VideoTelegraphyClientEvents> =
	T extends keyof VideoTelegraphyClientEventMap
		? {
				type: T;
			} & GetClientEventData<T>
		: never;
