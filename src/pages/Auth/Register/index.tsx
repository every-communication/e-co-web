import { MouseEventHandler } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";

import { IconChevronLeft } from "@/assets/icons/common";
import Avatar from "@/components/Common/Avatar";
import IconButton from "@/components/Common/Button/IconButton";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Input from "@/components/Common/Input";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import UserTypeChecker from "@/components/User/UserTypeChecker";
import { useToast } from "@/hooks";
import { useSignUpMutation } from "@/queries/auth/mutations";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";

import { registerSchema, RegisterSchema } from "./validator";

import styles from "./registerPage.module.scss";

// TODO: S3 처리 후 이미지 업로드 기능 만들면 썸네일 업로드 추가할 것
const RegisterPage: React.FC = () => {
	const { addToast } = useToast();
	const navigate = useNavigate();

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<RegisterSchema>({
		mode: "onTouched",
		resolver: zodResolver(registerSchema),
	});

	const { mutateAsync: signUp } = useSignUpMutation();

	const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
		const name = e.currentTarget.name as keyof RegisterSchema;
		setValue(name, "", { shouldValidate: true });
	};

	const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
		try {
			const { data: resultMessage } = await signUp(data);
			addToast({ state: "positive", message: resultMessage });
			navigate({ to: "/auth", replace: true });
		} catch (err) {
			if (isKyHTTPError(err)) {
				const { message } = await getKyHTTPError(err);
				addToast({ state: "negative", message });
			}
		}
	};

	return (
		<HeightFitLayout className={styles.wrapper}>
			<main className={styles.registerForm}>
				<div className={styles.header}>
					<h1 className={styles.title}>회원가입</h1>
					<Link className={styles.backButton} to="..">
						<IconButton>
							<IconChevronLeft />
						</IconButton>
					</Link>
				</div>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Avatar size={100} />
					<Input
						label="이메일"
						type="text"
						inputMode="email"
						autoComplete="email"
						errorMessage={errors.email?.message}
						placeholder="이메일을 입력하세요"
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("email")}
					/>
					<Input
						label="닉네임"
						type="text"
						inputMode="text"
						autoComplete="username"
						errorMessage={errors.nickname?.message}
						placeholder="닉네임을 입력하세요"
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("nickname")}
					/>
					<Input
						label="비밀번호"
						placeholder="비밀번호를 입력하세요"
						type="password"
						inputMode="none"
						autoComplete="new-password"
						errorMessage={errors.password?.message}
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("password")}
					/>
					<Input
						label="비밀번호 확인"
						type="password"
						inputMode="none"
						autoComplete="new-password"
						errorMessage={errors.passwordConfirm?.message}
						placeholder="비밀번호와 동일하게 입력하세요"
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("passwordConfirm")}
					/>
					<div className={styles.userTypeCheckerWrapper}>
						<span className={styles.label}>농인 / 청인</span>
						<Controller
							name="userType"
							control={control}
							render={({ field: { value, onChange } }) => <UserTypeChecker userType={value} onChange={onChange} />}
						/>
					</div>
					<div className={styles.registerButtonWrapper}>
						<SolidPrimaryButton
							size="medium"
							type="submit"
							fill
							className={styles.registerButton}
							disabled={!isValid || isSubmitting}
						>
							회원가입 하기
						</SolidPrimaryButton>
					</div>
				</form>
			</main>
		</HeightFitLayout>
	);
};

export default RegisterPage;
