import type { ApiResponseDTO } from "@/common/types/common";
import type { UpdateMeDTO, UserInfoDTO } from "@/common/types/users";

import { authApiClient } from "./apiClient";

/** 본인 정보 조회 */
export const getMeApi = () => authApiClient.get<ApiResponseDTO<UserInfoDTO>>("users/me").json();

/** 본인 정보 수정 */
export const updateMeApi = (json: UpdateMeDTO) =>
	authApiClient.put<ApiResponseDTO<UserInfoDTO>>("users/me", { json }).json();
