import type { ReactNode } from "react";

import cx from "clsx";

import { IconClose } from "@/assets/icons/common";

import { ModalPortal, type ModalPortalProps } from "../ModalPortal";

import styles from "./baseModal.module.scss";

interface Props extends ModalPortalProps {
	title: ReactNode;
	footer?: ReactNode;
	contentClassName?: string;
}

const BaseModal: React.FC<Props> = ({
	isShow,
	children,
	blockCloseWhenClickOverlay = false,
	className,
	onClose,
	title,
	overlayClassName,
	wrapperClassName,
	contentClassName,
	footer,
}) => {
	return (
		<ModalPortal
			isShow={isShow}
			blockCloseWhenClickOverlay={blockCloseWhenClickOverlay}
			className={cx(styles.wrapper, className)}
			onClose={onClose}
			overlayClassName={overlayClassName}
			wrapperClassName={wrapperClassName}
		>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				<button type="button" aria-label="close modal" onClick={onClose} className={styles.closeButton}>
					<IconClose />
				</button>
			</header>
			<div className={cx(styles.content, contentClassName)}>{children}</div>
			{footer && <div className={styles.footer}>{footer}</div>}
		</ModalPortal>
	);
};

export default BaseModal;
