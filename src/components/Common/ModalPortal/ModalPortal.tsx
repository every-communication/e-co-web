import { memo, MouseEventHandler, type ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import cx from "clsx";

import Overlay from "../Overlay";

import styles from "./modalPortal.module.scss";

const modalRoot = document.querySelector("#modal") as HTMLDivElement;

export interface ModalPortalProps {
	isShow: boolean;
	onClose?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	wrapperClassName?: string;
	overlayClassName?: string;
	blockCloseWhenClickOverlay?: boolean;
	children: ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
	isShow,
	onClose,
	wrapperClassName,
	className,
	children,
	overlayClassName,
	blockCloseWhenClickOverlay = false,
}) => {
	const nodeRef = useRef(null);

	return createPortal(
		<CSSTransition
			in={isShow}
			timeout={200}
			classNames={{
				enter: styles.enter,
				enterDone: styles.enterDone,
				exitActive: styles.exitActive,
				exit: styles.exit,
			}}
			nodeRef={nodeRef}
			unmountOnExit
		>
			<div className={cx(styles.wrapper, wrapperClassName)} ref={nodeRef}>
				<Overlay
					className={cx(styles.overlay, overlayClassName, {
						[styles.blockCloseOverlay]: blockCloseWhenClickOverlay,
					})}
					onClose={blockCloseWhenClickOverlay ? undefined : onClose}
				/>
				<aside className={cx(styles.modal, className)}>{children}</aside>
			</div>
		</CSSTransition>,
		modalRoot,
	);
};

export default memo(ModalPortal);
