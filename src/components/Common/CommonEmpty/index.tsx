import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./commonEmpty.module.scss";

interface Props {
	className?: string;
	icon: ReactNode;
	title: string;
	description: string;
	cta?: ReactNode;
}

const CommonEmpty: React.FC<Props> = ({ cta, description, icon, title, className }) => {
	return (
		<div className={cx(styles.wrapper, className)}>
			{icon && <div className={styles.iconWrapper}>{icon}</div>}
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.description}>{description}</p>
			{cta}
		</div>
	);
};

export default CommonEmpty;
