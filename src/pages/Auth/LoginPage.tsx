import { useId } from "react";

import { imageLogo } from "@/assets/images";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Input from "@/components/Common/Input";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";

import styles from "./loginPage.module.scss";

const LoginPage: React.FC = () => {
	const formId = useId();

	return (
		<HeightFitLayout className={styles.wrapper}>
			<main className={styles.loginForm}>
				<img src={imageLogo} alt="e-co logo" className={styles.logo} />
				<form className={styles.form} id={formId}>
					<Input
						label="이메일"
						type="email"
						className={styles.input}
						placeholder="이메일을 입력하세요."
						inputMode="email"
						autoComplete="email"
					/>
					<Input
						label="비밀번호"
						type="password"
						className={styles.input}
						placeholder="비밀번호를 입력하세요."
						inputMode="none"
						autoComplete="current-password"
					/>
					<SolidPrimaryButton type="submit" form={formId} size="large" fill>
						로그인
					</SolidPrimaryButton>
				</form>
			</main>
		</HeightFitLayout>
	);
};

export default LoginPage;
