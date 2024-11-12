import Skeleton from "react-loading-skeleton";

import { useNavigate } from "@tanstack/react-router";

import type { RoomHistoryDTO } from "@/common/types/videoTelegraphy";
import Avatar from "@/components/Common/Avatar";
import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";
import FriendTag from "@/components/Friend/Tag";
import { useCreateRoomWithInviteMutation } from "@/queries/videoTelegraphy/mutations";
import { dayjs, formatDuration } from "@/utils/date";

import styles from "./item.module.scss";

interface Props {
	history: RoomHistoryDTO;
}

const Item: React.FC<Props> = ({ history }) => {
	const navigate = useNavigate();

	const { mutateAsync: createRoomWithInvite } = useCreateRoomWithInviteMutation();

	const onCall = async () => {
		const { code } = (await createRoomWithInvite(history.friendId)).data;
		navigate({ to: `/video-telegraphy/$code`, params: { code } });
	};

	return (
		<li className={styles.wrapper}>
			<Avatar size={40} src={history.friendThumbnail} />
			<div className={styles.info}>
				<p className={styles.nameWrapper}>
					<span className={styles.nickname}>{history.friendName}</span>
					<FriendTag friendType={history.friendOrNot ? "FRIEND" : "DEFAULT"} />
				</p>
				<address className={styles.email}>{history.friendEmail}</address>
				<time className={styles.duration}>통화시간: {formatDuration(history.duration)}</time>
				<time className={styles.duration}>{dayjs(history.deletedAt).format("YYYY년 MM월 DD일 HH:mm:ss")}</time>
			</div>
			<TextPrimaryButton type="button" size="medium" onClick={onCall}>
				통화하기
			</TextPrimaryButton>
		</li>
	);
};

export default Item;

export const LoadingItem: React.FC = () => {
	return (
		<li className={styles.wrapper}>
			<Avatar size={40} />
			<div className={styles.info}>
				<Skeleton width={100} containerClassName={styles.nameWrapper} />
				<Skeleton containerClassName={styles.email} width={150} />
				<Skeleton containerClassName={styles.duration} width={170} />
				<Skeleton containerClassName={styles.duration} width={200} />
			</div>
			<TextPrimaryButton type="button" size="medium" disabled>
				통화하기
			</TextPrimaryButton>
		</li>
	);
};
