import { useMutation } from "@tanstack/react-query";

import { uploadImageApi } from "@/services/images";

export const useUploadImageMutation = () => {
	return useMutation({
		mutationFn: uploadImageApi,
	});
};
