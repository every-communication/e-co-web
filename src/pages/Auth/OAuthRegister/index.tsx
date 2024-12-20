import { type MouseEventHandler } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";

import { IconChevronLeft } from "@/assets/icons/common";
import Avatar from "@/components/Common/Avatar";
import IconButton from "@/components/Common/Button/IconButton";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Dropzone from "@/components/Common/Dropzone";
import Input from "@/components/Common/Input";
import LabelValue from "@/components/Common/LabelValue";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import QueryValidChecker from "@/components/QueryValidChecker";
import UserTypeChecker from "@/components/User/UserTypeChecker";
import { useToast } from "@/hooks";
import { useOAuthRegisterMutation } from "@/queries/auth/mutations";
import { useUploadImageMutation } from "@/queries/images/mutations";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";

import OAuthValidChecker from "./OAuthIdValidChecker";
import { oauthRegisterSchema, type OAuthRegisterSchema } from "./validator";

import styles from "./OAuthRegisterPage.module.scss";

const OAuthRegisterPage: React.FC = () => {
	const search = useSearch({ from: "/auth/oauth-register" });

	const { addToast } = useToast();
	const navigate = useNavigate();

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<OAuthRegisterSchema>({
		mode: "onTouched",
		resolver: zodResolver(oauthRegisterSchema),
	});

	const { mutateAsync: oauthRegister } = useOAuthRegisterMutation();
	const { mutateAsync: uploadImage } = useUploadImageMutation();

	const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
		const name = e.currentTarget.name as keyof OAuthRegisterSchema;
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

	const onSubmit: SubmitHandler<OAuthRegisterSchema> = async (data) => {
		try {
			const { thumbnailFile, ...rest } = data;
			const imageResponse = await handleUploadImage(thumbnailFile);

			const { data: resultMessage } = await oauthRegister({
				id: search.id,
				...rest,
				thumbnail: imageResponse ? imageResponse.imageUrl : search.thumbnail || null,
			});
			addToast({ state: "positive", message: resultMessage });
			navigate({ to: "/auth/register-complete", replace: true, search: data });
		} catch (err) {
			if (isKyHTTPError(err)) {
				const { message } = await getKyHTTPError(err);
				addToast({ state: "negative", message });
			}
		}
	};

	return (
		<QueryValidChecker search={search} redirectTo="/auth">
			<OAuthValidChecker>
				<HeightFitLayout className={styles.wrapper}>
					<main className={styles.registerForm}>
						<div className={styles.header}>
							<h1 className={styles.title}>회원가입</h1>
							<Link className={styles.backButton} to="/auth" replace>
								<IconButton>
									<IconChevronLeft />
								</IconButton>
							</Link>
						</div>
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
										<Avatar size={100} src={value ? URL.createObjectURL(value) : search.thumbnail} hasEdit />
									</Dropzone>
								)}
							/>
							<LabelValue label="이메일">{search.id}</LabelValue>
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
							<div className={styles.userTypeCheckerWrapper}>
								<span className={styles.label}>농인 / 청인</span>
								<Controller
									name="userType"
									control={control}
									render={({ field: { value, onChange } }) => <UserTypeChecker userType={value} onChange={onChange} />}
								/>
							</div>
							<div className={styles.registerButtonWrapper}>
								<SolidPrimaryButton
									size="medium"
									type="submit"
									fill
									className={styles.registerButton}
									disabled={!isValid || isSubmitting}
								>
									회원가입 하기
								</SolidPrimaryButton>
							</div>
						</form>
					</main>
				</HeightFitLayout>
			</OAuthValidChecker>
		</QueryValidChecker>
	);
};

export default OAuthRegisterPage;
