import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./labelValue.module.scss";

interface Props {
	label: string;
	children: ReactNode;
	className?: string;
}

const LabelValue: React.FC<Props> = ({ label, children, className }) => {
	return (
		<div className={cx(styles.wrapper, className)}>
			<span className={styles.label}>{label}</span>
			<span className={styles.value}>{children}</span>
		</div>
	);
};

export default LabelValue;
