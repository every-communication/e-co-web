import type { UserInfoDTO } from "./users";

export interface TokenDTO {
	accessToken: string;
	refreshToken: string;
}

export interface UserSignInDTO extends Pick<UserInfoDTO, "email" | "password"> {}

export interface UserSignUpDTO
	extends Pick<UserInfoDTO, "email" | "password" | "nickname" | "userType" | "thumbnail"> {}

export interface OAuthRegisterDTO extends Pick<UserInfoDTO, "nickname" | "userType"> {
	id: string;
}
