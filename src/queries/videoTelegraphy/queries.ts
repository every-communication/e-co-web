import { useQuery } from "@tanstack/react-query";

import { getRoomApi } from "@/services/videoTelegraphy";

import { queries } from "..";

/** 방 상세 조회 */
export const useGetRoomQuery = (code: string) =>
	useQuery({
		queryKey: queries.videoTelegraphy.getRoom(code).queryKey,
		queryFn: () => getRoomApi(code),
	});
