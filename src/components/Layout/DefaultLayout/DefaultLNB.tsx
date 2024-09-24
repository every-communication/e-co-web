import { useLayoutEffect, useRef } from "react";
import { useWindowSize } from "react-use";

import Avatar from "@/components/Common/Avatar";
import sizes from "@/styles/constants/sizes.module.scss";

import styles from "./defaultLNB.module.scss";

// TODO: LNB ITEM
const DefaultLNB: React.FC = () => {
	const asideRef = useRef<HTMLDivElement>(null);
	const { height } = useWindowSize();

	useLayoutEffect(() => {
		if (!asideRef.current) return;
		if (!CSS.supports("min-height: 100dvh"))
			asideRef.current.style.minHeight = `calc(${height}px - ${sizes.S_DEFAULT_HEADER_DESKTOP_HEIGHT})`;
	}, [height]);

	return (
		<aside className={styles.wrapper} ref={asideRef}>
			<section className={styles.userInfoWrapper}>
				<Avatar size={80} />
				<div className={styles.info}>
					<h2 className={styles.name}>[TODO] 홍길동</h2>
					<address className={styles.email}>[TODO] test@kakao.com</address>
					<span className={styles.userType}>[TODO] 농인</span>
				</div>
			</section>
			<hr className={styles.divider} />
		</aside>
	);
};

export default DefaultLNB;
