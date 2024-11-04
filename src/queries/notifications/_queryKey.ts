import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notifications = createQueryKeys("notifications", {
	getNotifications: ["getNotifications"],
	getUnreadNotificationCount: ["getUnreadNotificationCount"],
});
