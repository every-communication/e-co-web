import { useSuspenseQuery } from "@tanstack/react-query";

import { getFriendsApi, getReceivedFriendsApi, getRequestedFriendsApi } from "@/services/friends";

import { queries } from "..";

/** 친구 불러오기 */
export const useGetFriendsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.friends.getFriends.queryKey,
		queryFn: getFriendsApi,
	});

/** 요청 중인 친구 목록 조회 */
export const useGetRequestedFriendsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.friends.getRequestedFriends.queryKey,
		queryFn: getRequestedFriendsApi,
	});

/** 요청 받은 친구 목록 조회 */
export const useGetReceivedFriendsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.friends.getReceivedFriends.queryKey,
		queryFn: getReceivedFriendsApi,
	});
