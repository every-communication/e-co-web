import type { ComponentProps } from "react";

import cx from "clsx";

import Interaction from "../Interaction";

import styles from "./iconButton.module.scss";

interface Props extends ComponentProps<"button"> {
	hasBadge?: boolean;
}

const IconButton: React.FC<Props> = ({ hasBadge, disabled, children, className, ...props }) => {
	return (
		<button
			className={cx(styles.wrapper, className, {
				[styles.badge]: hasBadge,
			})}
			disabled={disabled}
			{...props}
		>
			{children}
			<Interaction backgroundColor="--c-label-normal" variant="light" disabled={disabled} />
		</button>
	);
};

export default IconButton;
