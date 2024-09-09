/** DEAF: 농인 / NODEAF: 청인 */
export type UserType = "DEAF" | "NODEAF";

export interface UserSignInDTO {
	email: string;
	password: string;
}

export interface LoginResponseDTO {
	accessToken: string;
	refreshToken: string;
}

export interface UserSignUpDTO {
	email: string;
	password: string;
	nickname: string;
	userType: UserType;
}
