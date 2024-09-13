import type { UserDTO } from "./uesrs";

export interface TokenDTO {
	accessToken: string;
	refreshToken: string;
}

export interface UserSignInDTO extends Pick<UserDTO, "email" | "password"> {}

export interface UserSignUpDTO extends Pick<UserDTO, "email" | "password" | "nickname" | "userType"> {}
