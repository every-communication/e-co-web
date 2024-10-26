import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetReceivedFriendsSuspenseQuery } from "@/queries/friends/queries";

import Empty from "./Empty";

const ReceivedFriendList: React.FC = () => {
	const { data } = useGetReceivedFriendsSuspenseQuery();

	if (data.data.length === 0) return <Empty />;

	return (
		<ul>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="RECEIVED" />
			))}
		</ul>
	);
};

export default ReceivedFriendList;
