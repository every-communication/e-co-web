import { z } from "zod";

export const updateMeSchema = z.object({
	nickname: z.string().min(1, "닉네임을 입력해주세요."),
	thumbnailFile: z.instanceof(File).optional(),
});

export type UpdateMeSchema = z.infer<typeof updateMeSchema>;
