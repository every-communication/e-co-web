import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetFriendsSuspenseQuery } from "@/queries/friends/queries";

import Empty from "./Empty";

const FriendList: React.FC = () => {
	const { data } = useGetFriendsSuspenseQuery();

	if (data.data.length === 0) return <Empty />;

	return (
		<ul>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="FRIEND" />
			))}
		</ul>
	);
};

export default FriendList;
