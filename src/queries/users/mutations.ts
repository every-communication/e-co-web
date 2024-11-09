import { useMutation } from "@tanstack/react-query";

import { updateMeApi } from "@/services/users";

export const useUpdateMeMutation = () => {
	return useMutation({
		mutationFn: updateMeApi,
	});
};
