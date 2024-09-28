import { Suspense } from "react";

import { useSearch } from "@tanstack/react-router";

import Content, { LoadingContent } from "./Content";
import FriendList from "./FriendList";
import ReceivedFriendList from "./ReceivedFriendList";
import RequestedFriendList from "./RequestedFriendList";
import TabBar from "./TabBar";

import styles from "./friendsPage.module.scss";

const FriendsPage: React.FC = () => {
	const { tab } = useSearch({ from: "/friends" });

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
		</main>
	);
};

export default FriendsPage;
