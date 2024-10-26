import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks";
import { createRoomApi } from "@/services/videoTelegraphy";

import { queries } from "..";

/** 방 생성 */
export const useCreateRoomMutation = () => {
	const { addToast } = useToast();

	return useMutation({
		mutationFn: createRoomApi,
		onError: () => {
			addToast({ state: "negative", message: "방 생성에 실패했습니다." });
		},
	});
};
