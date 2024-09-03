import type { ComponentProps } from "react";

import cx from "clsx";

import Interaction from "../Interaction";

import styles from "./solidPrimaryButton.module.scss";

type Size = "large" | "medium" | "small";

interface Props extends ComponentProps<"button"> {
	size: Size;
}

const SolidPrimaryButton: React.FC<Props> = ({ type, size, className, children, disabled, ...props }) => {
	console.assert(Boolean(type), "Button type을 명시해주세요.");

	return (
		<button type={type} className={cx(styles.wrapper, className, styles[size])} {...props}>
			{children}
			<Interaction backgroundColor="--c-label-normal" variant="strong" />
		</button>
	);
};

export default SolidPrimaryButton;
