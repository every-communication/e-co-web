import { Link, useSearch } from "@tanstack/react-router";

import { imageCompleteRegister } from "@/assets/images";
import { USER_TYPE_MAPPER } from "@/common/constants/user";
import type { UserType } from "@/common/types/users";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import QueryValidChecker from "@/components/QueryValidChecker";

import styles from "./registerCompletePage.module.scss";

const RegisterCompletePage: React.FC = () => {
	const { nickname, userType } = useSearch({ from: "/auth/register-complete" });

	return (
		<QueryValidChecker search={{ nickname, userType }} redirectTo="/auth">
			<HeightFitLayout className={styles.wrapper}>
				<main className={styles.main}>
					<img src={imageCompleteRegister} alt="complete-register check" className={styles.check} />
					<h1 className={styles.title}>회원가입이 완료되었습니다!</h1>
					<p className={styles.description}>
						{`${USER_TYPE_MAPPER[userType as UserType]} ${nickname}님의 회원가입을 축하드려요!\n농인/청인 정보를 비롯한 설정들은 마이페이지에서 변경 가능합니다 :)`}
					</p>
					<Link to="/auth" replace className={styles.loginButton}>
						<SolidPrimaryButton type="button" size="large" fill>
							로그인 하러가기
						</SolidPrimaryButton>
					</Link>
				</main>
			</HeightFitLayout>
		</QueryValidChecker>
	);
};

export default RegisterCompletePage;
