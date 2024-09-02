import { type ComponentProps, forwardRef, ForwardRefRenderFunction, MouseEventHandler, useId } from "react";

import cx from "clsx";

import styles from "./input.module.scss";

interface Props extends ComponentProps<"input"> {
	inputClassName?: string;
	label?: string;
	helpText?: string;
	onClickClearButton?: MouseEventHandler<HTMLButtonElement>;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
	{
		className,
		placeholder = "PLACEHOLDER",
		inputClassName,
		disabled,
		type,
		inputMode,
		label,
		helpText,
		onClickClearButton,
		...props
	},
	ref,
) => {
	const id = useId();
	const helpTextId = useId();

	console.assert(Boolean(placeholder), "Input placeholder을 명시해주세요.");
	console.assert(Boolean(type), "Input type을 명시해주세요.");
	console.assert(Boolean(inputMode), "Input inputMode을 명시해주세요.");

	return (
		<label className={cx(styles.wrapper, className)} htmlFor={id} aria-disabled={disabled}>
			{label && <span className={styles.label}>{label}</span>}
			<div className={styles.inputWrapper}>
				<input
					id={id}
					ref={ref}
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					inputMode={inputMode}
					className={cx(styles.input, inputClassName)}
					aria-describedby={helpText ? helpTextId : undefined}
					{...props}
				/>
				<button
					type="button"
					aria-label="Clear Input Button"
					className={styles.closeButton}
					onClick={onClickClearButton}
				/>
			</div>
			{helpText && (
				<span className={styles.helpText} id={helpTextId}>
					{helpText}
				</span>
			)}
		</label>
	);
};

export default forwardRef(Input);
