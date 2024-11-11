import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getRoomApi, getRoomHistoriesApi } from "@/services/videoTelegraphy";

import { queries } from "..";

/** 방 상세 조회 */
export const useGetRoomQuery = (code: string) =>
	useQuery({
		queryKey: queries.videoTelegraphy.getRoom(code).queryKey,
		queryFn: () => getRoomApi(code),
	});

/** 최근 통화 목록 */
export const useGetRoomHistoriesSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.videoTelegraphy.getRoomHistories.queryKey,
		queryFn: getRoomHistoriesApi,
		refetchOnMount: true,
	});
