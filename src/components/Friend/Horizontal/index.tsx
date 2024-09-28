import Skeleton from "react-loading-skeleton";

import type { FriendListDTO, FriendType } from "@/common/types/friends";
import Avatar from "@/components/Common/Avatar";

import Menu from "./Menu";
import FriendTag, { LoadingFriendTag } from "../Tag";

import styles from "./horizontalFriend.module.scss";

interface Props {
	className?: string;
	friend: FriendListDTO;
	friendType: FriendType;
}

const HorizontalFriend: React.FC<Props> = ({ friend, friendType }) => {
	return (
		<li className={styles.wrapper}>
			<Avatar size={40} src={friend.thumbnail} />
			<div className={styles.info}>
				<div className={styles.nameWrapper}>
					<span className={styles.nickname}>{friend.nickname}</span>
					<FriendTag friendType={friendType} />
				</div>
				<address className={styles.email}>{friend.email}</address>
			</div>
			<Menu friendType={friendType} friendId={friend.userId} />
		</li>
	);
};

export default HorizontalFriend;

export const LoadingHorizontalFriend: React.FC = () => {
	return (
		<li className={styles.wrapper}>
			<Avatar size={40} />
			<div className={styles.info}>
				<div className={styles.nameWrapper}>
					<Skeleton width={100} />
					<LoadingFriendTag />
				</div>
				<Skeleton width={150} />
			</div>
			<Skeleton width={40} />
		</li>
	);
};
