import { Info, LogoutMenu, UserType } from "./_sections";

import styles from "./myPage.module.scss";

const MyPage: React.FC = () => {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>마이페이지</h1>
			<Info />
			<UserType />
			<LogoutMenu />
		</main>
	);
};

export default MyPage;
