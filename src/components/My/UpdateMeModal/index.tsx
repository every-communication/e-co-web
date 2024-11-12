import { MouseEventHandler } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";

import Avatar from "@/components/Common/Avatar";
import BaseModal from "@/components/Common/BaseModal";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Dropzone from "@/components/Common/Dropzone";
import Input from "@/components/Common/Input";
import LabelValue from "@/components/Common/LabelValue";
import { useMe, useToast } from "@/hooks";
import { useUploadImageMutation } from "@/queries/images/mutations";
import { useUpdateMeMutation } from "@/queries/users/mutations";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";
import { useMeStore } from "@/zustand/me";

import { updateMeSchema, UpdateMeSchema } from "./validator";

import styles from "./updateMeModal.module.scss";

interface Props {
	isShow: boolean;
	onClose: () => void;
}

const UpdateMeModal: React.FC<Props> = ({ isShow, onClose }) => {
	const { setMe } = useMeStore();
	const { me, refetchMe } = useMe();
	const { addToast } = useToast();

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<UpdateMeSchema>({
		mode: "onTouched",
		resolver: zodResolver(updateMeSchema),
		defaultValues: {
			nickname: me.nickname,
		},
	});

	const { mutateAsync: uploadImage } = useUploadImageMutation();
	const { mutateAsync: updateMe } = useUpdateMeMutation();

	const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
		const name = e.currentTarget.name as keyof UpdateMeSchema;
		setValue(name, "", { shouldValidate: true });
	};

	const onDrop = (files: File[]) => {
		if (files.length !== 1) return;
		return files[0];
	};

	const handleUploadImage = async (file?: File) => {
		if (!file) return;
		const formData = new FormData();
		formData.append("image", file);
		return await uploadImage(formData);
	};

	const onSubmit: SubmitHandler<UpdateMeSchema> = async (data) => {
		try {
			const { thumbnailFile, nickname } = data;
			let thumbnail = me.thumbnail;
			if (thumbnailFile) {
				const imageResponse = await handleUploadImage(thumbnailFile);
				if (imageResponse) thumbnail = imageResponse.imageUrl;
			}

			const { data: updatedMe } = await updateMe({
				nickname,
				userType: me.userType,
				thumbnail,
			});
			setMe(updatedMe);
			await refetchMe();

			onClose();
		} catch (err) {
			if (isKyHTTPError(err)) {
				const { message } = await getKyHTTPError(err);
				addToast({ state: "negative", message });
			}
		}
	};

	return (
		<BaseModal
			isShow={isShow}
			onClose={onClose}
			blockCloseWhenClickOverlay
			wrapperClassName={styles.wrapper}
			className={styles.contentWrapper}
			title="내 정보 수정"
			contentClassName={styles.content}
		>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="thumbnailFile"
					control={control}
					render={({ field: { value, onChange } }) => (
						<Dropzone
							options={{
								onDrop: (files) => onChange(onDrop(files)),
								multiple: false,
								noDragEventsBubbling: true,
								accept: { "image/png": [], "image/jpeg": [] },
							}}
						>
							<Avatar size={100} src={value ? URL.createObjectURL(value) : me.thumbnail} hasEdit />
						</Dropzone>
					)}
				/>

				<LabelValue label="이메일">{me.email}</LabelValue>
				<Input
					label="닉네임"
					type="text"
					inputMode="text"
					autoComplete="username"
					errorMessage={errors.nickname?.message}
					placeholder="닉네임을 입력하세요"
					required
					className={styles.input}
					onClickClearButton={onClickClear}
					{...register("nickname")}
				/>
				<SolidPrimaryButton
					size="medium"
					type="submit"
					fill
					className={styles.button}
					disabled={!isValid || isSubmitting}
				>
					수정하기
				</SolidPrimaryButton>
			</form>
		</BaseModal>
	);
};

export default UpdateMeModal;
