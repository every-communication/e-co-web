import type { ApiResponseDTO } from "@/common/types/common";
import type { UserDTO } from "@/common/types/uesrs";

import { authApiClient } from "./apiClient";

/** 본인 정보 조회 */
export const getMeApi = () => authApiClient.get<ApiResponseDTO<UserDTO>>("users/me").json();
