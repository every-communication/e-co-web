import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useToast } from "@/hooks";
import {
	createRoomApi,
	createRoomWithInviteApi,
	getRoomApi,
	joinRoomApi,
	leaveRoomApi,
} from "@/services/videoTelegraphy";

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

/** 친구 초대 + 방 생성 */
export const useCreateRoomWithInviteMutation = () => {
	const navigate = useNavigate();
	const { addToast } = useToast();

	return useMutation({
		mutationFn: createRoomWithInviteApi,
		onSuccess: (data) => {
			navigate({ to: `/video-telegraphy/$code`, params: { code: data.data.code } });
		},
		onError: () => {
			addToast({ state: "negative", message: "상대와의 방 생성에 실패했습니다." });
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
