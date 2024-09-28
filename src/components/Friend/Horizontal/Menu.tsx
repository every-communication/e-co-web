import type { FriendType } from "@/common/types/friends";
import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";

import styles from "./menu.module.scss";

interface Props {
	friendType: FriendType;
}

const Menu: React.FC<Props> = ({ friendType }) => {
	return (
		<div className={styles.wrapper}>
			{friendType === "default" && (
				<TextPrimaryButton type="button" size="small">
					친구 요청
				</TextPrimaryButton>
			)}
			{friendType === "friend" && (
				<TextPrimaryButton type="button" size="small" className={styles.negative}>
					친구 끊기
				</TextPrimaryButton>
			)}
			{friendType === "requested" && (
				<TextPrimaryButton type="button" size="small" className={styles.redOrange}>
					요청 취소
				</TextPrimaryButton>
			)}
			{friendType === "received" && (
				<>
					<TextPrimaryButton type="button" size="small" className={styles.positive}>
						수락
					</TextPrimaryButton>
					<TextPrimaryButton type="button" size="small" className={styles.negative}>
						거절
					</TextPrimaryButton>
				</>
			)}
		</div>
	);
};

export default Menu;
