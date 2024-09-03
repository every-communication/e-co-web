import { type ReactNode, useLayoutEffect, useRef } from "react";
import { useWindowSize } from "react-use";

import styles from "./rootLayout.module.scss";

interface Props {
	children: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
	const layoutRef = useRef<HTMLDivElement>(null);
	const { height } = useWindowSize();

	useLayoutEffect(() => {
		if (!layoutRef.current) return;
		if (CSS.supports("min-height: 100dvh")) layoutRef.current.style.minHeight = `${height}px`;
	}, [height]);

	return (
		<div className={styles.wrapper} ref={layoutRef}>
			{children}
		</div>
	);
};

export default RootLayout;
