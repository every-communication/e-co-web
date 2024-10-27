import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./baseMenu.module.scss";

interface Props extends ComponentProps<"button"> {}

const BaseMenu: React.FC<Props> = ({ className, ...props }) => {
	return <button type="button" className={cx(styles.wrapper, className)} {...props} />;
};

export default BaseMenu;
