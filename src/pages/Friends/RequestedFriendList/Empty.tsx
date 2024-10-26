import { useState } from "react";

import { IconPlus } from "@/assets/icons/common";
import { IconFriend } from "@/assets/icons/layout";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import CommonEmpty from "@/components/Common/CommonEmpty";
import SearchFriendModal from "@/components/Friend/SearchFriendModal";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
	const [isShowSearchModal, setIsShowSearchModal] = useState(false);

	return (
		<>
			<CommonEmpty
				className={styles.empty}
				title="요청 중인 친구가 없습니다."
				description="친구를 신청해보세요!"
				icon={<IconFriend className={styles.friendIcon} />}
				cta={
					<SolidPrimaryButton size="large" className={styles.cta} onClick={() => setIsShowSearchModal(true)}>
						<IconPlus className={styles.plus} />
						친구 추가하기
					</SolidPrimaryButton>
				}
			/>
			<SearchFriendModal isShow={isShowSearchModal} onClose={() => setIsShowSearchModal(false)} />
		</>
	);
};

export default Empty;
