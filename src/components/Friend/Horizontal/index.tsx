import type { FriendListDTO, FriendType } from "@/common/types/friends";
import Avatar from "@/components/Common/Avatar";

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
			{friend.nickname}
		</li>
	);
};

export default HorizontalFriend;
