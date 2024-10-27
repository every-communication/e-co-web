import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetRequestedFriendsSuspenseQuery } from "@/queries/friends/queries";

import Empty from "./Empty";

const RequestedFriendList: React.FC = () => {
	const { data } = useGetRequestedFriendsSuspenseQuery();

	if (data.data.length === 0) return <Empty />;

	return (
		<ul>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="REQUESTED" />
			))}
		</ul>
	);
};

export default RequestedFriendList;
