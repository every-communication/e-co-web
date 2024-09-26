import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetFriendsSuspenseQuery } from "@/queries/friends/quries";

import styles from "./content.module.scss";

const FriendList: React.FC = () => {
	const { data } = useGetFriendsSuspenseQuery();

	return (
		<section className={styles.wrapper}>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="friend" />
			))}
		</section>
	);
};

export default FriendList;
