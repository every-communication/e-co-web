import { useLayoutEffect, useRef } from "react";
import { useWindowSize } from "react-use";

import { Link } from "@tanstack/react-router";

import { FRIENDS_TABS } from "@/common/constants/friends";
import { USER_TYPE_MAPPER } from "@/common/constants/user";
import Avatar from "@/components/Common/Avatar";
import OutlineAssistiveButton from "@/components/Common/Button/OutlineAssistiveButton";
import { useMe } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";

import styles from "./defaultLNB.module.scss";

const DefaultLNB: React.FC = () => {
	const asideRef = useRef<HTMLDivElement>(null);
	const { height } = useWindowSize();

	const { me, logout } = useMe();

	useLayoutEffect(() => {
		if (!asideRef.current) return;
		if (!CSS.supports("min-height: 100dvh"))
			asideRef.current.style.minHeight = `calc(${height}px - ${sizes.S_DEFAULT_HEADER_DESKTOP_HEIGHT})`;
	}, [height]);

	return (
		<aside className={styles.wrapper} ref={asideRef}>
			<section className={styles.userInfoWrapper}>
				<Avatar size={80} src={me.thumbnail} />
				<div className={styles.info}>
					<h2 className={styles.name}>{me.nickname}</h2>
					<address className={styles.email}>{me.email}</address>
					<span className={styles.userType}>{USER_TYPE_MAPPER[me.userType]}</span>
				</div>
			</section>
			<hr className={styles.divider} />
			<nav className={styles.nav}>
				<Link className={styles.item} to="/" activeProps={{ className: styles.active }}>
					홈
				</Link>
				<Link
					className={styles.item}
					to="/friends"
					activeOptions={{ includeSearch: false }}
					activeProps={{ className: styles.active }}
					search={{ tab: FRIENDS_TABS[0] }}
				>
					친구
				</Link>
				<Link className={styles.item} to="/my-page" activeProps={{ className: styles.active }}>
					마이페이지
				</Link>
			</nav>
			<OutlineAssistiveButton type="button" size="medium" fill onClick={logout}>
				로그아웃
			</OutlineAssistiveButton>
		</aside>
	);
};

export default DefaultLNB;
