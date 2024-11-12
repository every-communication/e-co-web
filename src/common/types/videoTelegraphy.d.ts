export interface RoomDTO {
	id: number;
	code: string;
	ownerId: number;
	friendId: number | null;
	user1Id: number | null;
	user2Id: number | null;
	mic1: boolean;
	cam1: boolean;
	mic2: boolean;
	cam2: boolean;
	createdAt: Date;
	deletedAt: Date | null;
}

export interface UpdateRoomMediaDTO {
	code: string;
	mic: boolean;
	cam: boolean;
}

export interface RoomHistoryDTO {
	callTime: string;
	friendEmail: string;
	friendName: string;
	friendOrNot: boolean;
	friendThumbnail: string | null;
	totalCallTime: string;
}
