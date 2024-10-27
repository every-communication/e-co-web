import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./section.module.scss";

interface Props {
	className?: string;
	title: ReactNode;
	children: ReactNode;
	isFlexHeight?: boolean;
}

const Section: React.FC<Props> = ({ title, className, children, isFlexHeight = false }) => {
	return (
		<section className={cx(styles.wrapper, className, { [styles.isFlexHeight]: isFlexHeight })}>
			<h2 className={styles.title}>{title}</h2>
			{children}
		</section>
	);
};

export default Section;
