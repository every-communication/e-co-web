import { useSuspenseQuery } from "@tanstack/react-query";

import { getUsersApi } from "@/services/users";

import { queries } from "..";

/** 유저들 가져오기 */
export const useGetUsersSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.users.getUsers.queryKey,
		queryFn: getUsersApi,
	});
