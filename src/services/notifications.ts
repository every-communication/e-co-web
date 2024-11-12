import type { ApiResponseDTO } from "@/common/types/common";
import type { VideoNotificationDTO } from "@/common/types/videoTelegraphy";

import { authApiClient } from "./apiClient";

/** 알림 목록 불러오기 */
export const getNotificationsApi = () => authApiClient.get("notifications/list").json();

/** 읽지 않은 알림 개수 조회 */
export const getUnreadNotificationCountApi = () => authApiClient.get("notifications/unread-count").json();

/** 화상통화 초대 알림 */
export const getRequestedVideoTelegraphyNotificationsApi = () =>
	authApiClient.get<ApiResponseDTO<VideoNotificationDTO[]>>("notifications/video-telephony/requested").json();
