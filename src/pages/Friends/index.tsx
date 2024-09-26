import { Suspense } from "react";

import { useSearch } from "@tanstack/react-router";

import FriendList from "./FriendList";
import TabBar from "./TabBar";

import styles from "./friendsPage.module.scss";

const FriendsPage: React.FC = () => {
	const { tab } = useSearch({ from: "/friends" });

	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>친구</h1>
			<TabBar />
			{tab === "friends" && (
				<Suspense fallback={<></>}>
					<FriendList />
				</Suspense>
			)}
		</main>
	);
};

export default FriendsPage;
