export type UserRole = "GUEST" | "USER" | "ADMIN";

export type SocialType = "KAKAO" | "GOOGLE" | "NAVER";

/** DEAF: 농인 / NODEAF: 청인 */
export type UserType = "DEAF" | "NODEAF";

export interface UserDTO {
	id: number;
	email: string;
	password: string;
	nickname: string;
	thumbnail: string;
	role: UserRole;
	userType: UserType;
	socialType: SocialType;
	socialId: string;
	refreshToken: string;
}
