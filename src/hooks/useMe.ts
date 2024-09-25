import { useCallback, useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import type { UserInfoDTO } from "@/common/types/users";
import { useGetMeQuery } from "@/queries/users/queries";
import { removeTokens } from "@/utils/token";
import { useMeStore } from "@/zustand/me";

interface ReturnUseMe {
	isLogined: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	me: UserInfoDTO;
	refetchMe: () => Promise<void>;
	logout: () => void;
}

const useMe = (): ReturnUseMe => {
	const queryClient = useQueryClient();
	const { data, refetch, isLoading, isSuccess, isError } = useGetMeQuery();
	const { me, isLogined, setMe, clear } = useMeStore();

	const refetchMe = useCallback(async () => {
		await refetch();
	}, [refetch]);

	const logout = useCallback(() => {
		removeTokens();
		queryClient.clear();
		clear();
	}, [clear, queryClient]);

	useEffect(() => {
		if (isError) clear();
		if (isSuccess) setMe(data.data);
	}, [setMe, isSuccess, isError, clear, data]);

	return {
		me: me as UserInfoDTO,
		isLoading,
		isLogined,
		isError,
		isSuccess,
		logout,
		refetchMe,
	};
};

export default useMe;
