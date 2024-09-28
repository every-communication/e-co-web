import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiResponseDTO } from "@/common/types/common";
import type { FriendListDTO } from "@/common/types/friends";
import { useToast } from "@/hooks";
import {
	deleteFriendApi,
	receivedFriendApproveApi,
	receivedFriendRemoveApi,
	removeRequestFriendApi,
	requestFriendApi,
} from "@/services/friends";

import { queries } from "..";

/** 친구 삭제 */
export const useDeleteFriendMutation = (friendId: number) => {
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => deleteFriendApi(friendId),
		onSuccess: async () => {
			queryClient.setQueryData<ApiResponseDTO<FriendListDTO[]>>(queries.friends.getFriends.queryKey, (prev) => {
				if (!prev) return prev;
				const newFriends = prev.data.filter((friend) => friend.userId !== friendId);
				return { ...prev, data: newFriends };
			});
			await queryClient.invalidateQueries({ queryKey: queries.friends.searchFriends._def });
			await queryClient.invalidateQueries({ queryKey: queries.friends.getFriends.queryKey });
			addToast({ message: "친구 삭제가 완료되었습니다.", state: "positive" });
		},
	});
};

/** 친구 요청 */
export const useRequestFriendMutation = (friendId: number) => {
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => requestFriendApi(friendId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: queries.friends.searchFriends._def });
			await queryClient.invalidateQueries({ queryKey: queries.friends.getRequestedFriends.queryKey });
			addToast({ message: "친구 요청이 완료되었습니다.", state: "positive" });
		},
	});
};

/** 친구 요청 삭제 */
export const useRemoveRequestFriendMutation = (friendId: number) => {
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => removeRequestFriendApi(friendId),
		onSuccess: async () => {
			queryClient.setQueryData<ApiResponseDTO<FriendListDTO[]>>(
				queries.friends.getRequestedFriends.queryKey,
				(prev) => {
					if (!prev) return prev;
					const newFriends = prev.data.filter((friend) => friend.userId !== friendId);
					return { ...prev, data: newFriends };
				},
			);
			await queryClient.invalidateQueries({ queryKey: queries.friends.searchFriends._def });
			await queryClient.invalidateQueries({ queryKey: queries.friends.getRequestedFriends.queryKey });
			addToast({ message: "친구 요청 삭제가 완료되었습니다.", state: "positive" });
		},
	});
};

/** 요청받은 친구 수락 */
export const useReceivedFriendApproveMutation = (friendId: number) => {
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => receivedFriendApproveApi(friendId),
		onSuccess: async () => {
			queryClient.setQueryData<ApiResponseDTO<FriendListDTO[]>>(queries.friends.getReceivedFriends.queryKey, (prev) => {
				if (!prev) return prev;
				const newFriends = prev.data.filter((friend) => friend.userId !== friendId);
				return { ...prev, data: newFriends };
			});
			await queryClient.invalidateQueries({ queryKey: queries.friends.searchFriends._def });
			await queryClient.invalidateQueries({ queryKey: queries.friends.getReceivedFriends.queryKey });
			await queryClient.invalidateQueries({ queryKey: queries.friends.getFriends.queryKey });
			addToast({ message: "친구 요청 수락이 완료되었습니다.", state: "positive" });
		},
	});
};

/** 요청받은 친구 거절 */
export const useReceivedFriendRemoveMutation = (friendId: number) => {
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => receivedFriendRemoveApi(friendId),
		onSuccess: async () => {
			queryClient.setQueryData<ApiResponseDTO<FriendListDTO[]>>(queries.friends.getReceivedFriends.queryKey, (prev) => {
				if (!prev) return prev;
				const newFriends = prev.data.filter((friend) => friend.userId !== friendId);
				return { ...prev, data: newFriends };
			});
			await queryClient.invalidateQueries({ queryKey: queries.friends.searchFriends._def });
			await queryClient.invalidateQueries({ queryKey: queries.friends.getReceivedFriends.queryKey });
			addToast({ message: "친구 요청 거절이 완료되었습니다.", state: "positive" });
		},
	});
};
