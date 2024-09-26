import { Link } from "@tanstack/react-router";

import { FRIENDS_TAB_MAPPER, FRIENDS_TABS } from "@/common/constants/friends";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
	return (
		<nav className={styles.wrapper}>
			{FRIENDS_TABS.map((tab) => (
				<Link
					key={tab}
					to="/friends"
					search={{ tab }}
					className={styles.tab}
					activeProps={{ className: styles.active }}
				>
					{FRIENDS_TAB_MAPPER[tab]}
				</Link>
			))}
		</nav>
	);
};

export default TabBar;
