import Empty from "../Empty";
import Section from "../Section";

import styles from "./recentCallList.module.scss";

const RecentCallList: React.FC = () => {
	return (
		<Section title="최근 통화 목록" isFlexHeight>
			{/* <ul className={styles.wrapper}></ul> */}
			<Empty title="최근 통화 목록이 없어요" description="방을 생성해서 통화를 시작해보세요" />
		</Section>
	);
};

export default RecentCallList;
