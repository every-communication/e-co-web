import type { ComponentProps } from "react";

import cx from "clsx";

import Interaction from "../Interaction";

import styles from "./textPrimaryButton.module.scss";

type Size = "medium" | "small";

interface Props extends ComponentProps<"button"> {
	size: Size;
}

const TextPrimaryButton: React.FC<Props> = ({ size, type, className, children, disabled, ...props }) => {
	console.assert(Boolean(type), "Button type을 명시해주세요.");

	return (
		<button className={cx(styles.wrapper, className, styles[size])} type={type} disabled={disabled} {...props}>
			{children}
			<Interaction backgroundColor="--c-primary-normal" variant="normal" disabled={disabled} />
		</button>
	);
};

export default TextPrimaryButton;
