export interface RoomDTO {
	id: number;
	code: string;
	user1Id: number;
	user2Id: number | null;
	mic1: boolean;
	cam1: boolean;
	mic2: boolean;
	cam2: boolean;
	createdAt: Date;
	deletedAt: Date | null;
}
