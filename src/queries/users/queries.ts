import { useQuery } from "@tanstack/react-query";

import { getMeApi } from "@/services/users";

import { queries } from "..";

/** 본인 정보 조회 */
export const useGetMeQuery = () =>
	useQuery({
		queryKey: queries.users.getMe.queryKey,
		queryFn: getMeApi,
		staleTime: Infinity,
		enabled: false,
	});
