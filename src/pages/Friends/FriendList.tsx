import { useGetFriendsSuspenseQuery } from "@/queries/friends/quries";

import styles from "./content.module.scss";

const FriendList: React.FC = () => {
	const { data } = useGetFriendsSuspenseQuery();

	return <section className={styles.wrapper}>{JSON.stringify(data)}</section>;
};

export default FriendList;
