import { SubmitHandler, useForm } from "react-hook-form";

import { useNavigate } from "@tanstack/react-router";

import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";
import Input from "@/components/Common/Input";
import { useToast } from "@/hooks";
import { useRoomValidateMutation } from "@/queries/videoTelegraphy/mutations";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";

import styles from "./joinRoom.module.scss";

const JoinRoom: React.FC = () => {
	const navigate = useNavigate();
	const { addToast } = useToast();
	const { mutateAsync: roomValidate } = useRoomValidateMutation();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isDirty },
	} = useForm<{ code: string }>();

	const onSubmit: SubmitHandler<{ code: string }> = async (data) => {
		try {
			await roomValidate(data.code);
			navigate({ to: `/video-telegraphy/$code`, params: { code: data.code } });
		} catch (err) {
			if (isKyHTTPError(err)) {
				addToast({ state: "negative", message: "존재하지 않는 방이거나, 이미 통화가 완료된 방입니다." });
			}
		}
	};

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder="코드를 입력하세요"
				inputMode="text"
				type="text"
				className={styles.input}
				{...register("code")}
			/>
			<TextPrimaryButton type="submit" size="medium" disabled={!isDirty || isSubmitting}>
				접속
			</TextPrimaryButton>
		</form>
	);
};

export default JoinRoom;
