import { createQueryKeys } from "@lukemorales/query-key-factory";

export const auth = createQueryKeys("auth", {
	checkOAuthIdValid: (socialId: string) => ["checkOAuthIdValid", socialId],
});
