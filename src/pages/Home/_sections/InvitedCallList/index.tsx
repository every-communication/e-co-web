import Section from "../Section";

import styles from "./invitedCallList.module.scss";

const InvitedCallList: React.FC = () => {
	return (
		<Section title="초대 목록 0건" isFlexHeight>
			<ul className={styles.wrapper}></ul>
		</Section>
	);
};

export default InvitedCallList;
