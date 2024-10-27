import type { ReactNode } from "react";

import { IconKakao } from "@/assets/icons/auth";
import { imageGoogle } from "@/assets/images";
import type { SocialType } from "@/common/types/users";
import Avatar from "@/components/Common/Avatar";
import OutlineAssistiveButton from "@/components/Common/Button/OutlineAssistiveButton";
import { useMe } from "@/hooks";

import styles from "./info.module.scss";

const ICON_MAPPER: Record<SocialType, ReactNode> = {
	KAKAO: <IconKakao />,
	GOOGLE: <img src={imageGoogle} alt="google" className={styles.google} />,
	ECO: null,
};

const Info: React.FC = () => {
	const { me } = useMe();

	return (
		<section className={styles.wrapper}>
			<Avatar src={me.thumbnail} size={40} />
			<div className={styles.info}>
				<h2 className={styles.name}>{me.nickname}</h2>
				<span className={styles.additionalInfo}>
					<small className={styles.email}>{me.email}</small>
					{ICON_MAPPER[me.socialType]}
				</span>
			</div>
			<OutlineAssistiveButton size="medium" type="button" className={styles.edit}>
				수정
			</OutlineAssistiveButton>
		</section>
	);
};

export default Info;
