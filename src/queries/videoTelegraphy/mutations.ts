import { useMutation } from "@tanstack/react-query";

import { createRoomApi } from "@/services/videoTelegraphy";

import { queries } from "..";

/** 방 생성 */
export const useCreateRoomMutation = () => {
	return useMutation({
		mutationFn: createRoomApi,
	});
};
