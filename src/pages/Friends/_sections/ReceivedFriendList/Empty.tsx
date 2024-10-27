import { IconFriend } from "@/assets/icons/layout";
import CommonEmpty from "@/components/Common/CommonEmpty";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
	return (
		<CommonEmpty
			className={styles.empty}
			title="요청 받은 친구가 없습니다."
			description="친구가 되려고 신청한 사람이 없어요 :("
			icon={<IconFriend className={styles.friendIcon} />}
		/>
	);
};

export default Empty;
