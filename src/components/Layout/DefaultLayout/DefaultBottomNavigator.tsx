import { Link } from "@tanstack/react-router";

import { IconCall, IconFriend, IconMyPage } from "@/assets/icons/layout";
import { FRIENDS_TABS } from "@/common/constants/friends";

import styles from "./defaultBottomNavigator.module.scss";

const DefaultBottomNavigator: React.FC = () => {
	return (
		<footer className={styles.wrapper}>
			<nav className={styles.nav}>
				<Link
					className={styles.item}
					to="/friends"
					search={{ tab: FRIENDS_TABS[0] }}
					activeProps={{ className: styles.active }}
					activeOptions={{ includeSearch: false }}
				>
					<IconFriend />
					친구
				</Link>
				<Link className={styles.item} to="/" activeProps={{ className: styles.active }}>
					<IconCall />홈
				</Link>
				<Link className={styles.item} to="/my-page" activeProps={{ className: styles.active }}>
					<IconMyPage />
					마이페이지
				</Link>
			</nav>
		</footer>
	);
};

export default DefaultBottomNavigator;
