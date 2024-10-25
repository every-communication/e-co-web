import { IconCall } from "@/assets/icons/layout";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import { useCreateRoomMutation } from "@/queries/videoTelegraphy/mutations";

import styles from "./createRoomButton.module.scss";

// TODO: navigate
const CreateRoomButton: React.FC = () => {
	const { mutateAsync: createRoom } = useCreateRoomMutation();

	const onClickCreateRoom = async () => {
		await createRoom();
	};

	return (
		<SolidPrimaryButton type="button" size="large" className={styles.wrapper} onClick={onClickCreateRoom}>
			<IconCall className={styles.callIcon} />
			<span className={styles.text}>방 생성하기</span>
		</SolidPrimaryButton>
	);
};

export default CreateRoomButton;
