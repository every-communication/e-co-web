import { useNavigate } from "@tanstack/react-router";

import type { VideoNotificationDTO } from "@/common/types/videoTelegraphy";
import Avatar from "@/components/Common/Avatar";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import { useReadVideoTelegraphyNotificationMutation } from "@/queries/notifications/mutations";

import styles from "./item.module.scss";

interface Props {
	item: VideoNotificationDTO;
}

const Item: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();

	const { mutateAsync: readVideoTelegraphyNotification } = useReadVideoTelegraphyNotificationMutation();

	const onClickCall = async () => {
		navigate({ to: "/video-telegraphy/$code", params: { code: item.roomCode } });
		await readVideoTelegraphyNotification(item.notificationId);
	};

	return (
		<li className={styles.wrapper}>
			<Avatar size={40} src={item.requestUserThumbnail} />
			<div className={styles.info}>
				<span className={styles.nickname}>{item.requestUserName}</span>
				<address className={styles.email}>{item.requestUserEmail}</address>
			</div>
			<div className={styles.buttonWrapper}>
				<SolidPrimaryButton type="button" size="small" className={styles.call} onClick={onClickCall}>
					통화하기
				</SolidPrimaryButton>
				<SolidPrimaryButton
					type="button"
					size="small"
					className={styles.reject}
					onClick={() => readVideoTelegraphyNotification(item.notificationId)}
				>
					거절하기
				</SolidPrimaryButton>
			</div>
		</li>
	);
};

export default Item;
