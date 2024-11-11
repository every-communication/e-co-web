import { createQueryKeys } from "@lukemorales/query-key-factory";

export const videoTelegraphy = createQueryKeys("videoTelegraphy", {
	getRoom: (roomId: string) => ["getRoom", { roomId }],
	getRoomHistories: ["getRoomHistories"],
});
