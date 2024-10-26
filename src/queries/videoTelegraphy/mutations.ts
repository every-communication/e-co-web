import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks";
import { createRoomApi, getRoomApi, joinRoomApi, leaveRoomApi } from "@/services/videoTelegraphy";

import { queries } from "..";

export const useRoomValidateMutation = () => {
	return useMutation({
		mutationFn: getRoomApi,
	});
};

/** 방 생성 */
export const useCreateRoomMutation = () => {
	const { addToast } = useToast();

	return useMutation({
		mutationFn: createRoomApi,
		onError: () => {
			addToast({ state: "negative", message: "방 생성에 실패했습니다." });
		},
	});
};

/** 방 참여 */
export const useJoinRoomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: joinRoomApi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: queries.videoTelegraphy.getRoom._def });
		},
	});
};

/** 방 떠나기 */
export const useLeaveRoomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: leaveRoomApi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: queries.videoTelegraphy.getRoom._def });
		},
	});
};
