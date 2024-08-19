import type { User } from "@/common/types/users";

import { apiClient } from "./apiClient";

/** 유저들 가져오기  */
export const getUsersApi = () => apiClient.get<User[]>("users").json();
