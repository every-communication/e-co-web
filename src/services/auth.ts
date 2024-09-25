import type { OAuthRegisterDTO, TokenDTO, UserSignInDTO, UserSignUpDTO } from "@/common/types/auth";
import type { ApiResponseDTO } from "@/common/types/common";
import type { SocialType } from "@/common/types/users";

import { apiClient } from "./apiClient";

/** 자체 로그인 */
export const signInApi = (json: UserSignInDTO) =>
	apiClient.post<ApiResponseDTO<TokenDTO>>("auth/sign-in", { json }).json();

/** 자체 회원가입 */
export const signUpApi = (json: UserSignUpDTO) =>
	apiClient.post<ApiResponseDTO<string>>("auth/sign-up", { json }).json();

/** oauth id 존재 여부 확인 */
export const checkOAuthIdValidApi = (id: string) => apiClient.get<boolean>(`auth/oauth-id-validate/${id}`).json();

/** oauth 로그인 후 추가 정보 기입 */
export const oauthRegisterApi = ({ id, ...json }: OAuthRegisterDTO) =>
	apiClient.post<ApiResponseDTO<SocialType>>(`auth/oauth-register/${id}`, { json }).json();
