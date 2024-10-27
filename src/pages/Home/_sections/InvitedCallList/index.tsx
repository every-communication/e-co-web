import Empty from "../Empty";
import Section from "../Section";

import styles from "./invitedCallList.module.scss";

const InvitedCallList: React.FC = () => {
	return (
		<Section title="초대 목록 0건" isFlexHeight>
			{/* <ul className={styles.wrapper}></ul> */}
			<Empty title="초대받은 내역이 없어요" description="방 코드를 직접 입력해서 접속할 수 있어요" />
		</Section>
	);
};

export default InvitedCallList;
