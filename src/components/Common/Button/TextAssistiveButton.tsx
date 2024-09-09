import type { ComponentProps } from "react";

import cx from "clsx";

import Interaction from "../Interaction";

import styles from "./textAssistiveButton.module.scss";

type Size = "medium" | "small";

interface Props extends ComponentProps<"button"> {
	size: Size;
}

const TextAssistiveButton: React.FC<Props> = ({ size, type, children, className, disabled, ...props }) => {
	console.assert(Boolean(type), "Button type을 명시해주세요.");

	return (
		<button type={type} disabled={disabled} className={cx(styles.wrapper, className, styles[size])} {...props}>
			{children}
			<Interaction backgroundColor="--c-label-normal" variant="light" disabled={disabled} />
		</button>
	);
};

export default TextAssistiveButton;
