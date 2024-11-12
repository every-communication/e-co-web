import { useSuspenseQuery } from "@tanstack/react-query";

import {
	getNotificationsApi,
	getRequestedVideoTelegraphyNotificationsApi,
	getUnreadNotificationCountApi,
} from "@/services/notifications";

import { queries } from "..";

/** 알림 목록 불러오기 */
export const useGetNotificationsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.notifications.getNotifications.queryKey,
		queryFn: getNotificationsApi,
	});

/** 읽지 않은 알림 개수 조회 */
export const useGetUnreadNotificationCountSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.notifications.getUnreadNotificationCount.queryKey,
		queryFn: getUnreadNotificationCountApi,
		refetchOnMount: true,
		refetchInterval: 1000 * 10,
	});

/** 화상통화 초대 알림 */
export const useGetRequestedVideoTelegraphyNotificationsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.notifications.getRequestedVideoTelegraphyNotificationsApi.queryKey,
		queryFn: getRequestedVideoTelegraphyNotificationsApi,
		refetchOnMount: true,
		refetchInterval: 1000 * 10,
	});
