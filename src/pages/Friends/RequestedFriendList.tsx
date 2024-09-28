import HorizontalFriend from "@/components/Friend/Horizontal";
import { useGetRequestedFriendsSuspenseQuery } from "@/queries/friends/quries";

const RequestedFriendList: React.FC = () => {
	const { data } = useGetRequestedFriendsSuspenseQuery();

	return (
		<ul>
			{data.data.map((friend) => (
				<HorizontalFriend key={friend.userId} friend={friend} friendType="requested" />
			))}
		</ul>
	);
};

export default RequestedFriendList;
