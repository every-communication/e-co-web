import React, { memo, type MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./overlay.module.scss";

interface Props {
	onClose?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

const Overlay: React.FC<Props> = ({ onClose, className }) => {
	return <button tabIndex={0} aria-label="overlay" className={cx(styles.wrapper, className)} onClick={onClose} />;
};

export default memo(Overlay);
