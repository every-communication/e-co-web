import { useMutation } from "@tanstack/react-query";

import { updateMeApi } from "@/services/users";

/** 내 정보 변경  */
export const useUpdateMeMutation = () => {
	return useMutation({
		mutationFn: updateMeApi,
	});
};
