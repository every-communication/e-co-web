export type UserRole = "GUEST" | "USER" | "ADMIN";

export type SocialType = "KAKAO" | "GOOGLE" | "NAVER" | "ECO";

/** DEAF: 농인 / NODEAF: 청인 */
export type UserType = "DEAF" | "NODEAF";

export interface UserInfoDTO {
	id: number;
	email: string;
	nickname: string;
	thumbnail: string;
	/** DEAF: 농인 / NODEAF: 청인 */
	userType: UserType;
	socialType: SocialType;
}
