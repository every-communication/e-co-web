export type UserRole = "GUEST" | "USER" | "ADMIN";

export type SocialType = "KAKAO" | "GOOGLE" | "ECO";

/** DEAF: 농인 / NONDEAF: 청인 */
export type UserType = "DEAF" | "NONDEAF";

export interface UserInfoDTO {
	id: number;
	email: string;
	nickname: string;
	thumbnail: string;
	/** DEAF: 농인 / NONDEAF: 청인 */
	userType: UserType;
	socialType: SocialType;
}
