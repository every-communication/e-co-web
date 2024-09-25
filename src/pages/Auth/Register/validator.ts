import { z } from "zod";

export const registerSchema = z
	.object({
		email: z.string().min(1, "이메일을 입력해주세요.").email({ message: "이메일 형식이 올바르지 않습니다." }),
		nickname: z.string().min(1, "닉네임을 입력해주세요."),
		password: z.string().min(1, "비밀번호를 입력해주세요."),
		passwordConfirm: z.string().min(1, "비밀번호를 입력해주세요."),
		userType: z.enum(["DEAF", "NONDEAF"]),
	})
	.refine(({ password, passwordConfirm }) => password === passwordConfirm, {
		message: "비밀번호가 일치하지 않습니다.",
		path: ["passwordConfirm"],
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
