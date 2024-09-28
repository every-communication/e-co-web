import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetFriendsSuspenseQuery } from "@/queries/friends/quries";

const FriendList: React.FC = () => {
	const { data } = useGetFriendsSuspenseQuery();

	return (
		<ul>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="friend" />
			))}
		</ul>
	);
};

export default FriendList;
