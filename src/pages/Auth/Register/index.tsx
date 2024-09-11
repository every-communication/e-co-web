import { MouseEventHandler } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Avatar from "@/components/Common/Avatar";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Input from "@/components/Common/Input";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import UserTypeChecker from "@/components/User/UserTypeChecker";

import { registerSchema, RegisterSchema } from "./validator";

import styles from "./registerPage.module.scss";

// TODO: S3 처리 후 이미지 업로드 기능 만들면 썸네일 업로드 추가할 것
const RegisterPage: React.FC = () => {
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

	const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
		const name = e.currentTarget.name as keyof RegisterSchema;
		setValue(name, "", { shouldValidate: true });
	};

	const onSubmit: SubmitHandler<RegisterSchema> = (e) => {};

	return (
		<HeightFitLayout className={styles.wrapper}>
			<main className={styles.registerForm}>
				<h1 className={styles.title}>회원가입</h1>
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
					<fieldset className={styles.userTypeCheckerWrapper}>
						<legend className={styles.legend}>농인 / 청인</legend>
						<Controller
							name="userType"
							control={control}
							render={({ field: { value, onChange } }) => <UserTypeChecker userType={value} onChange={onChange} />}
						/>
					</fieldset>
					<SolidPrimaryButton
						size="medium"
						type="submit"
						fill
						className={styles.registerButton}
						disabled={!isValid || isSubmitting}
					>
						회원가입 하기
					</SolidPrimaryButton>
				</form>
			</main>
		</HeightFitLayout>
	);
};

export default RegisterPage;
