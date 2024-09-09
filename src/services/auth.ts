import type { LoginResponseDTO, UserSignInDTO, UserSignUpDTO } from "@/common/types/auth";
import type { ApiResponseDTO } from "@/common/types/common";

import { apiClient } from "./apiClient";

/** 자체 로그인 */
export const signInApi = (json: UserSignInDTO) => apiClient.post<LoginResponseDTO>("auth/sign-in", { json }).json();

/** 자체 회원가입 */
export const signUpApi = (json: UserSignUpDTO) =>
	apiClient.post<ApiResponseDTO<string>>("auth/sign-up", { json }).json();
