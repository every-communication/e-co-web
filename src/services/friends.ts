import type { ApiResponseDTO } from "@/common/types/common";
import type { FriendListDTO, FriendSearchDTO } from "@/common/types/friends";

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

/** 친구 요청 */
export const requestFriendApi = (friendId: number) =>
	authApiClient.post<ApiResponseDTO<null>>(`friend-request/${friendId}`).json();

/** 친구 요청 삭제 */
export const removeRequestFriendApi = (friendId: number) =>
	authApiClient.patch<ApiResponseDTO<null>>("friend-request/remove", { json: friendId }).json();

/** 요청받은 친구 수락 */
export const receivedFriendApproveApi = (friendId: number) =>
	authApiClient.post<ApiResponseDTO<null>>("friend-requested/approve", { json: friendId }).json();

/** 요청받은 친구 거절 */
export const receivedFriendRemoveApi = (friendId: number) =>
	authApiClient.patch<ApiResponseDTO<null>>("friend-requested/remove", { json: friendId }).json();

/** 친구 검색 */
export const searchFriendsApi = (userInfo: string) =>
	authApiClient.get<ApiResponseDTO<FriendSearchDTO[]>>("friend-search", { searchParams: { userInfo } }).json();
