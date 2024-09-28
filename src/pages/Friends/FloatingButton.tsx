import { useState } from "react";

import { IconPlus } from "@/assets/icons/common";
import Interaction from "@/components/Common/Interaction";
import SearchFriendModal from "@/components/Friend/SearchFriendModal";

import styles from "./floatingButton.module.scss";

const FloatingButton: React.FC = () => {
	const [isShowSearchModal, setIsShowSearchModal] = useState(false);

	return (
		<>
			<button type="button" className={styles.wrapper} onClick={() => setIsShowSearchModal(true)}>
				<IconPlus className={styles.plus} />
				<Interaction variant="strong" backgroundColor="--c-label-normal" />
			</button>
			<SearchFriendModal isShow={isShowSearchModal} onClose={() => setIsShowSearchModal(false)} />
		</>
	);
};

export default FloatingButton;
