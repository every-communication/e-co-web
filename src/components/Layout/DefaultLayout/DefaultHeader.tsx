import { Suspense } from "react";

import { Link } from "@tanstack/react-router";

import { imageLogo } from "@/assets/images";

import AlarmButton, { LoadingAlarmButton } from "./AlarmButton";

import styles from "./defaultHeader.module.scss";

const DefaultHeader: React.FC = () => {
	return (
		<header className={styles.wrapper}>
			<Link to="/" aria-label="홈으로 돌아가기">
				<img src={imageLogo} alt="e-co 로고" className={styles.logo} />
			</Link>
			<Suspense fallback={<LoadingAlarmButton />}>
				<AlarmButton />
			</Suspense>
		</header>
	);
};

export default DefaultHeader;
