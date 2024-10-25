import cx from "clsx";

import { CreateRoomButton, JoinRoom, RecentCallList } from "./_sections";

import styles from "./homePage.module.scss";

// TODO: 로직 및 컴포넌트 분리 작업
const HomePage: React.FC = () => {
	return (
		<main className={styles.wrapper}>
			<div className={cx(styles.content, styles.left)}>
				<section className={cx(styles.section, styles.recentCallSection)}>
					<h2 className={styles.sectionTitle}>최근 통화 목록</h2>
					<RecentCallList />
				</section>
			</div>
			<div className={cx(styles.content, styles.right)}>
				<CreateRoomButton />
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>방 접속하기</h2>
					<JoinRoom />
				</section>
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>초대 목록 OO건</h2>
				</section>
			</div>
		</main>
	);
};

export default HomePage;
