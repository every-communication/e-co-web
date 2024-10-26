import { range } from "lodash-es";

import { useSearchFriendsSuspenseQuery } from "@/queries/friends/queries";

import HorizontalFriend, { LoadingHorizontalFriend } from "../Horizontal";

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
	return (
		<div className={styles.wrapper}>
			{range(10).map((value) => (
				<LoadingHorizontalFriend key={value} />
			))}
		</div>
	);
};
