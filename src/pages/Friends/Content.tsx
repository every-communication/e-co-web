import type { ReactNode } from "react";

import { range } from "lodash-es";

import { LoadingHorizontalFriend } from "@/components/Friend/Horizontal";

import styles from "./content.module.scss";

interface Props {
	children: ReactNode;
}

const Content: React.FC<Props> = ({ children }) => {
	return <section className={styles.wrapper}>{children}</section>;
};

export default Content;

export const LoadingContent: React.FC = () => {
	return (
		<section className={styles.wrapper}>
			{range(10).map((value) => (
				<LoadingHorizontalFriend key={value} />
			))}
		</section>
	);
};
