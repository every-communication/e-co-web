import BaseModal from "@/components/Common/BaseModal";

import styles from "./updateMeModal.module.scss";

interface Props {
	isShow: boolean;
	onClose: () => void;
}

const UpdateMeModal: React.FC<Props> = ({ isShow, onClose }) => {
	return (
		<BaseModal
			isShow={isShow}
			onClose={onClose}
			blockCloseWhenClickOverlay
			wrapperClassName={styles.wrapper}
			className={styles.contentWrapper}
			title="내 정보 수정"
		>
			ㅂㅈㄷㄹ
		</BaseModal>
	);
};

export default UpdateMeModal;
