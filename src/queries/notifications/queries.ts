import { useSuspenseQuery } from "@tanstack/react-query";

import { getRequestedVideoTelegraphyNotificationsApi } from "@/services/notifications";

import { queries } from "..";

export const useGetRequestedVideoTelegraphyNotificationsSuspenseQuery = () =>
	useSuspenseQuery({
		queryKey: queries.notifications.getRequestedVideoTelegraphyNotificationsApi.queryKey,
		queryFn: getRequestedVideoTelegraphyNotificationsApi,
		refetchOnMount: true,
	});
