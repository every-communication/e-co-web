import type { ApiResponseDTO } from "@/common/types/common";
import type { FriendListDTO } from "@/common/types/friends";

import { authApiClient } from "./apiClient";

/** 친구 불러오기 */
export const getFriendsApi = () => authApiClient.get<ApiResponseDTO<FriendListDTO[]>>("friends").json();

/** 친구 삭제 */
export const deleteFriendApi = (friendId: number) =>
	authApiClient.delete<ApiResponseDTO<null>>(`friends/${friendId}`).json();

/** 요청 중인 친구 목록 조회 */
export const getRequestedFriendsApi = () => authApiClient.get<ApiResponseDTO<FriendListDTO[]>>("friend-request").json();

/** 요청 받은 친구 목록 조회 */
export const getReceivedFriendsApi = () =>
	authApiClient.get<ApiResponseDTO<FriendListDTO[]>>("friend-requested").json();
