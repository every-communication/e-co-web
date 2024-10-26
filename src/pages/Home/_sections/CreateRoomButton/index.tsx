import { useForm } from "react-hook-form";

import { useNavigate } from "@tanstack/react-router";

import { IconCall } from "@/assets/icons/layout";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import { useCreateRoomMutation } from "@/queries/videoTelegraphy/mutations";

import styles from "./createRoomButton.module.scss";

const CreateRoomButton: React.FC = () => {
	const navigate = useNavigate();

	const { mutateAsync: createRoom } = useCreateRoomMutation();

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async () => {
		const { code } = (await createRoom()).data;
		navigate({ to: "/video-telegraphy/$code", params: { code } });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
			<SolidPrimaryButton type="submit" size="large" className={styles.wrapper} disabled={isSubmitting}>
				<IconCall className={styles.callIcon} />
				<span className={styles.text}>방 생성하기</span>
			</SolidPrimaryButton>
		</form>
	);
};

export default CreateRoomButton;
