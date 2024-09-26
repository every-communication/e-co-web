import { useSuspenseQuery } from "@tanstack/react-query";

import { getFriendsApi } from "@/services/friends";

import { queries } from "..";

/** 친구 불러오기 */
export const useGetFriendsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.friends.getFriends.queryKey,
		queryFn: getFriendsApi,
	});
