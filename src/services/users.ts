import type { ApiResponseDTO } from "@/common/types/common";
import type { UserInfoDTO } from "@/common/types/users";

import { authApiClient } from "./apiClient";

/** 본인 정보 조회 */
export const getMeApi = () => authApiClient.get<ApiResponseDTO<UserInfoDTO>>("users/me").json();

/** 본인 정보 수정 */
export const updateMeApi = () => authApiClient.put<ApiResponseDTO<UserInfoDTO>>("users/me").json();
