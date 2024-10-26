import { IconFriend } from "@/assets/icons/layout";
import CommonEmpty from "@/components/Common/CommonEmpty";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
	return (
		<>
			<CommonEmpty
				className={styles.empty}
				title="요청 중인 친구가 없습니다."
				description="친구를 신청해보세요!"
				icon={<IconFriend className={styles.friendIcon} />}
			/>
		</>
	);
};

export default Empty;
