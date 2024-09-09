import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useUnmount } from "react-use";

import cx from "clsx";

import { IconAlertTriangle, IconCheckCircle, IconInfo } from "@/assets/icons/toast";

import { ToastEventEmitter } from "./ToastEventEmitter";
import ToastPositioner from "./ToastPositioner";
import { TOAST_ACTION_MAPPER, TOAST_TIMEOUT, type ToastCallbackType, type ToastItem, type ToastState } from "./types";

import styles from "./toast.module.scss";

const TOAST_MAX_LENGTH = 3;

const TOAST_ICON_MAPPER = {
	neutral: null,
	informative: <IconInfo className={styles.icon} />,
	negative: <IconAlertTriangle className={styles.icon} />,
	positive: <IconCheckCircle className={styles.icon} />,
} as const satisfies Record<ToastState, ReactNode>;

const toastRoot = document.querySelector("#toast") as HTMLDivElement;

const Toast: React.FC = () => {
	const timers = useRef<Record<string, NodeJS.Timeout>>({});

	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const remove = useCallback((id: string) => {
		setToasts((prevState) => prevState.filter((notification) => notification.id !== id));
		delete timers.current?.[id];
	}, []);

	const checkHasSameMessageToast = useCallback(
		(toast: ToastItem) => {
			return toasts.find((prevToasts) => prevToasts.message === toast.message);
		},
		[toasts],
	);

	const addToast = useCallback(
		(toast: ToastItem) => {
			const sameMessageToast = checkHasSameMessageToast(toast);
			if (sameMessageToast) {
				clearTimeout(timers.current[sameMessageToast.id]);
				return (timers.current[sameMessageToast.id] = setTimeout(() => remove(sameMessageToast.id), TOAST_TIMEOUT));
			}

			setToasts((prev) => {
				if (prev.length >= TOAST_MAX_LENGTH) {
					delete timers.current?.[prev[0].id];
					return [...prev.slice(1), toast];
				}
				return [...prev, toast];
			});

			timers.current[toast.id] = setTimeout(() => remove(toast.id), TOAST_TIMEOUT);
		},
		[checkHasSameMessageToast, remove],
	);

	const clear = useCallback(() => {
		setToasts([]);
		timers.current = {};
	}, []);

	useEffect(() => {
		const eventCallback: ToastCallbackType = (toast) => {
			if (toast.action === TOAST_ACTION_MAPPER.ADD_TOAST) addToast(toast as ToastItem);
			if (toast.action === TOAST_ACTION_MAPPER.REMOVE_TOAST) remove(toast.id);
			if (toast.action === TOAST_ACTION_MAPPER.CLEAR_TOASTS) clear();
		};

		ToastEventEmitter.getInstance().addEventListener(eventCallback);
		return () => {
			ToastEventEmitter.getInstance().removeEventListener(eventCallback);
		};
	}, [addToast, clear, remove]);

	useUnmount(() => {
		setToasts([]);
		Object.values(timers.current).forEach((timer) => {
			if (timer) {
				clearTimeout(timer);
			}
		});
	});

	return createPortal(
		<ToastPositioner>
			<TransitionGroup className={styles.wrapper}>
				{toasts.map((toast) => (
					<CSSTransition
						key={toast.id}
						timeout={200}
						classNames={{
							enterDone: styles.enterDone,
							exitActive: styles.exitActive,
							exit: styles.exit,
							enter: styles.enter,
						}}
						unmountOnExit
					>
						<output className={cx(styles.toast, styles[toast.state])}>
							{TOAST_ICON_MAPPER[toast.state]}
							<span className={styles.text}>{toast.message}</span>
							{toast.hasClose && (
								<button type="button" className={styles.closeButton} onClick={() => remove(toast.id)} />
							)}
						</output>
					</CSSTransition>
				))}
			</TransitionGroup>
		</ToastPositioner>,
		toastRoot,
	);
};

export default Toast;
