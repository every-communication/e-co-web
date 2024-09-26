import type { ApiResponseDTO } from "@/common/types/common";
import type { FriendListDTO } from "@/common/types/friends";

import { authApiClient } from "./apiClient";

/** 친구 불러오기 */
export const getFriendsApi = () => authApiClient.get<ApiResponseDTO<FriendListDTO[]>>("friends").json();
