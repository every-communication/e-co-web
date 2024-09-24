import { useQuery } from "@tanstack/react-query";

import { checkOAuthIdValidApi } from "@/services/auth";

import { queries } from "..";

/** oauth id 존재 여부 확인 */
export const useCheckOAuthIdValidQuery = (socialId: string) =>
	useQuery({
		queryKey: queries.auth.checkOAuthIdValid(socialId).queryKey,
		queryFn: () => checkOAuthIdValidApi(socialId),
		staleTime: 0,
	});
