import { useSearchFriendsSuspenseQuery } from "@/queries/friends/quries";

import HorizontalFriend from "../Horizontal";

import styles from "./friendList.module.scss";

interface Props {
	keyword: string;
}

const FriendList: React.FC<Props> = ({ keyword }) => {
	const { data } = useSearchFriendsSuspenseQuery(keyword);

	return (
		<ul className={styles.wrapper}>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friendType={friend.friendType} friend={friend} />
			))}
		</ul>
	);
};

export default FriendList;

export const LoadingFriendList: React.FC = () => {
	return null;
};
