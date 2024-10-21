import { IconCall } from "@/assets/icons/layout";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";

import styles from "./createRoomButton.module.scss";

const CreateRoomButton: React.FC = () => {
	return (
		<SolidPrimaryButton type="button" size="large" className={styles.wrapper}>
			<IconCall className={styles.callIcon} />
			<span className={styles.text}>방 생성하기</span>
		</SolidPrimaryButton>
	);
};

export default CreateRoomButton;
