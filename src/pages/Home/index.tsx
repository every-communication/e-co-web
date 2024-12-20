import { Suspense } from "react";

import cx from "clsx";

import { CreateRoomButton, InvitedCallList, JoinRoom, LoadingRecentCallList, RecentCallList } from "./_sections";

import styles from "./homePage.module.scss";

// TODO: 로직 및 컴포넌트 분리 작업
const HomePage: React.FC = () => {
	return (
		<main className={styles.wrapper}>
			<div className={cx(styles.content, styles.left)}>
				<Suspense fallback={<LoadingRecentCallList />}>
					<RecentCallList />
				</Suspense>
			</div>
			<div className={cx(styles.content, styles.right)}>
				<CreateRoomButton />
				<JoinRoom />
				<InvitedCallList />
			</div>
		</main>
	);
};

export default HomePage;
