import type { ApiResponseDTO } from "@/common/types/common";
import type { RoomDTO } from "@/common/types/videoTelegraphy";

import { authApiClient } from "./apiClient";

/** 방 생성 */
export const createRoomApi = () => authApiClient.post<ApiResponseDTO<RoomDTO>>("api/rooms").json();
