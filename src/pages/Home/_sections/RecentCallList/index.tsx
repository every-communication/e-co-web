import Section from "../Section";

import styles from "./recentCallList.module.scss";

const RecentCallList: React.FC = () => {
	return (
		<Section title="최근 통화 목록" isFlexHeight>
			<ul className={styles.wrapper}></ul>
		</Section>
	);
};

export default RecentCallList;
