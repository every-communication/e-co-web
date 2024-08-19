import { useGetUsersSuspenseQuery } from "@/queries/users/queries";

const UserList: React.FC = () => {
	const { data } = useGetUsersSuspenseQuery();

	return (
		<ul>
			{data.map((user) => (
				<li key={user.id}>
					<h2>{user.name}</h2>
				</li>
			))}
		</ul>
	);
};

export default UserList;
