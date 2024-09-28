import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetReceivedFriendsSuspenseQuery } from "@/queries/friends/quries";

const ReceivedFriendList: React.FC = () => {
	const { data } = useGetReceivedFriendsSuspenseQuery();

	return (
		<ul>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="RECEIVED" />
			))}
		</ul>
	);
};

export default ReceivedFriendList;
