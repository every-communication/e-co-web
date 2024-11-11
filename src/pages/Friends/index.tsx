import { Suspense } from "react";

import { useSearch } from "@tanstack/react-router";

import { FriendList, ReceivedFriendList, RequestedFriendList } from "./_sections";
import Content, { LoadingContent } from "./Content";
import FloatingButton from "./FloatingButton";
import TabBar from "./TabBar";

import styles from "./friendsPage.module.scss";

const FriendsPage: React.FC = () => {
	const { tab } = useSearch({ from: "/_after-auth/friends" });

	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>친구</h1>
			<TabBar />
			<Suspense fallback={<LoadingContent />}>
				<Content>
					{tab === "friends" && <FriendList />}
					{tab === "received" && <ReceivedFriendList />}
					{tab === "requested" && <RequestedFriendList />}
				</Content>
			</Suspense>
			<FloatingButton />
		</main>
	);
};

export default FriendsPage;
