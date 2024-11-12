import { z } from "zod";

export const oauthRegisterSchema = z.object({
	nickname: z.string().min(1, "닉네임을 입력해주세요."),
	userType: z.enum(["DEAF", "NONDEAF"]),
	thumbnailFile: z.instanceof(File).optional(),
});

export type OAuthRegisterSchema = z.infer<typeof oauthRegisterSchema>;
