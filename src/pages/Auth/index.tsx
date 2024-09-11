import { type MouseEventHandler, useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";

import { imageLogo } from "@/assets/images";
import type { UserSignInDTO } from "@/common/types/auth";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import TextAssistiveButton from "@/components/Common/Button/TextAssistiveButton";
import Input from "@/components/Common/Input";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import { useMe, useToast } from "@/hooks";
import { useSignInMutation } from "@/queries/auth/mutations";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";
import { setTokens } from "@/utils/token";

import { loginSchema, type LoginSchema } from "./validator";

import styles from "./loginPage.module.scss";

// TODO: Bearer 토큰 저장
const LoginPage: React.FC = () => {
	const formId = useId();
	const { refetchMe } = useMe();
	const { addToast } = useToast();

	const { mutateAsync: signIn } = useSignInMutation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<LoginSchema>({ mode: "onTouched", resolver: zodResolver(loginSchema) });

	const onSubmit: SubmitHandler<UserSignInDTO> = async (data) => {
		try {
			const { data: tokens } = await signIn(data);
			setTokens(tokens);
			await refetchMe();
		} catch (err) {
			if (isKyHTTPError(err)) {
				const { message } = await getKyHTTPError(err);
				addToast({ state: "negative", message });
			}
		}
	};

	const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
		const name = e.currentTarget.name as keyof LoginSchema;
		setValue(name, "", { shouldValidate: true });
	};

	return (
		<HeightFitLayout className={styles.wrapper}>
			<main className={styles.loginForm}>
				<img src={imageLogo} alt="e-co logo" className={styles.logo} />
				<form className={styles.form} id={formId} onSubmit={handleSubmit(onSubmit)}>
					<Input
						label="이메일"
						onClickClearButton={onClickClear}
						type="text"
						className={styles.input}
						placeholder="이메일을 입력하세요."
						inputMode="email"
						autoComplete="email"
						errorMessage={errors.email?.message}
						{...register("email")}
					/>
					<Input
						label="비밀번호"
						onClickClearButton={onClickClear}
						type="password"
						className={styles.input}
						placeholder="비밀번호를 입력하세요."
						inputMode="none"
						autoComplete="current-password"
						errorMessage={errors.password?.message}
						{...register("password")}
					/>
				</form>
				<SolidPrimaryButton type="submit" form={formId} size="large" fill disabled={!isValid || isSubmitting}>
					로그인
				</SolidPrimaryButton>
				<Link to="/auth/register">
					<TextAssistiveButton size="medium" type="button">
						회원가입 하기
					</TextAssistiveButton>
				</Link>
			</main>
		</HeightFitLayout>
	);
};

export default LoginPage;
