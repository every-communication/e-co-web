import { Link } from "@tanstack/react-router";

import { IconAlarm } from "@/assets/icons/common";
import { imageLogo } from "@/assets/images";
import IconButton from "@/components/Common/Button/IconButton";
import { getNotificationsApi } from "@/services/notifications";

import styles from "./defaultHeader.module.scss";

const DefaultHeader: React.FC = () => {
	const onClick = async () => {
		console.log("hi");
		await getNotificationsApi();
	};

	return (
		<header className={styles.wrapper}>
			<Link to="/" aria-label="홈으로 돌아가기">
				<img src={imageLogo} alt="e-co 로고" className={styles.logo} />
			</Link>
			<IconButton className={styles.alarmButton} onClick={onClick}>
				<IconAlarm />
			</IconButton>
		</header>
	);
};

export default DefaultHeader;
