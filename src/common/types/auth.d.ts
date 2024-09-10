import type { UserType } from "./uesrs";

export interface UserSignInDTO {
	email: string;
	password: string;
}

export interface TokenDTO {
	accessToken: string;
	refreshToken: string;
}

export interface UserSignUpDTO {
	email: string;
	password: string;
	nickname: string;
	userType: UserType;
}
