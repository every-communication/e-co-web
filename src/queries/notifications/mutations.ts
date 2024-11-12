import { useMutation, useQueryClient } from "@tanstack/react-query";

import { readVideoTelegraphyNotificationApi } from "@/services/notifications";

import { queries } from "..";

/** 화상통화 알림 읽기 */
export const useReadVideoTelegraphyNotificationMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: readVideoTelegraphyNotificationApi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: queries.notifications.getRequestedVideoTelegraphyNotificationsApi.queryKey,
			});
			await queryClient.invalidateQueries({ queryKey: queries.notifications.getUnreadNotificationCount.queryKey });
			await queryClient.invalidateQueries({ queryKey: queries.notifications.getNotifications.queryKey });
		},
	});
};

/** 친구 알림 읽기 */
export const useReadFriendRequestNotificationMutation = () => {};
