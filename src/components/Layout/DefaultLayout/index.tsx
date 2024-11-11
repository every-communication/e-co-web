import { type ReactNode, useLayoutEffect, useRef } from "react";
import { useWindowSize } from "react-use";

import DefaultBottomNavigator from "./DefaultBottomNavigator";
import DefaultHeader from "./DefaultHeader";
import DefaultLNB from "./DefaultLNB";
import AfterAuthorizedLayout from "../Authorization/AfterAuthorizedLayout";

import styles from "./defaultLayout.module.scss";

interface Props {
	children: ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
	const layoutRef = useRef<HTMLDivElement>(null);
	const { height } = useWindowSize();

	useLayoutEffect(() => {
		if (!layoutRef.current) return;
		if (!CSS.supports("min-height: 100dvh")) layoutRef.current.style.minHeight = `${height}px`;
	}, [height]);

	return (
		<>
			<div className={styles.wrapper} ref={layoutRef}>
				<DefaultHeader />
				<DefaultLNB />
				<div className={styles.content}>{children}</div>
			</div>
			<DefaultBottomNavigator />
		</>
	);
};

export default DefaultLayout;
