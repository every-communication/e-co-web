import { type MouseEventHandler, useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";

import { IconKakao } from "@/assets/icons/auth";
import { imageGoogle, imageLogo, imageNaver } from "@/assets/images";
import { SocialType } from "@/common/types/users";
import IconButton from "@/components/Common/Button/IconButton";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import TextAssistiveButton from "@/components/Common/Button/TextAssistiveButton";
import Input from "@/components/Common/Input";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import config from "@/config";
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

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<LoginSchema>({ mode: "onTouched", resolver: zodResolver(loginSchema) });

	const { mutateAsync: signIn } = useSignInMutation();

	const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
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

	const onClickOAuth: MouseEventHandler<HTMLButtonElement> = (e) => {
		const oauth = e.currentTarget.dataset.oauth as Exclude<SocialType, "ECO">;
		window.open(`${config.API_URL}/auth/${oauth}`, "_blank");
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
				<div className={styles.oauthWrapper}>
					<IconButton type="button" className={styles.kakao} data-oauth="kakao" onClick={onClickOAuth}>
						<IconKakao />
					</IconButton>
					<IconButton type="button" className={styles.naver} data-oauth="naver" onClick={onClickOAuth}>
						<img src={imageNaver} alt="네이버 로그인" className={styles.naverImage} />
					</IconButton>
					<IconButton type="button" className={styles.google} data-oauth="google" onClick={onClickOAuth}>
						<img src={imageGoogle} alt="구글 로그인" className={styles.googleImage} />
					</IconButton>
				</div>
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
