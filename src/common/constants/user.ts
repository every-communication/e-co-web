import type { UserType } from "../types/users";

export const USER_TYPE_MAPPER: Record<UserType, string> = {
	DEAF: "농인",
	NONDEAF: "청인",
} as const;
