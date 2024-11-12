import { IconAlarm } from "@/assets/icons/common";
import IconButton from "@/components/Common/Button/IconButton";
import { useGetUnreadNotificationCountSuspenseQuery } from "@/queries/notifications/queries";

import styles from "./alarmButton.module.scss";

const AlarmButton: React.FC = () => {
	const { data } = useGetUnreadNotificationCountSuspenseQuery();

	return (
		<IconButton className={styles.wrapper} hasBadge={data.data > 0}>
			<IconAlarm />
		</IconButton>
	);
};

export default AlarmButton;

export const LoadingAlarmButton: React.FC = () => {
	return (
		<IconButton className={styles.wrapper} disabled>
			<IconAlarm />
		</IconButton>
	);
};
