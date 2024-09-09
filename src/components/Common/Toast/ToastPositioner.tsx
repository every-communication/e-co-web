import type { ReactNode } from "react";

import styles from "./toastPositioner.module.scss";

interface Props {
	children: ReactNode;
}

const ToastPositioner: React.FC<Props> = ({ children }) => {
	return <section className={styles.wrapper}>{children}</section>;
};

export default ToastPositioner;
