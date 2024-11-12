import type { FriendType } from "@/common/types/friends";
import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";
import {
	useDeleteFriendMutation,
	useReceivedFriendApproveMutation,
	useReceivedFriendRemoveMutation,
	useRemoveRequestFriendMutation,
	useRequestFriendMutation,
} from "@/queries/friends/mutations";
import { useCreateRoomWithInviteMutation } from "@/queries/videoTelegraphy/mutations";

import styles from "./menu.module.scss";

interface Props {
	friendType: FriendType;
	friendId: number;
}

const Menu: React.FC<Props> = ({ friendType, friendId }) => {
	const { mutateAsync: createRoomWithInvite } = useCreateRoomWithInviteMutation();
	const { mutateAsync: deleteFriend } = useDeleteFriendMutation(friendId);
	const { mutateAsync: removeRequestFriend } = useRemoveRequestFriendMutation(friendId);
	const { mutateAsync: receivedFriendApprove } = useReceivedFriendApproveMutation(friendId);
	const { mutateAsync: receivedFriendRemove } = useReceivedFriendRemoveMutation(friendId);
	const { mutateAsync: requestFriend } = useRequestFriendMutation(friendId);

	return (
		<div className={styles.wrapper}>
			{friendType === "DEFAULT" && (
				<TextPrimaryButton type="button" size="small" onClick={() => requestFriend()}>
					친구 요청
				</TextPrimaryButton>
			)}
			{friendType === "FRIEND" && (
				<>
					<TextPrimaryButton type="button" size="small" onClick={() => createRoomWithInvite(friendId)}>
						통화하기
					</TextPrimaryButton>
					<TextPrimaryButton type="button" size="small" className={styles.negative} onClick={() => deleteFriend()}>
						친구 끊기
					</TextPrimaryButton>
				</>
			)}
			{friendType === "REQUESTED" && (
				<TextPrimaryButton
					type="button"
					size="small"
					className={styles.redOrange}
					onClick={() => removeRequestFriend()}
				>
					요청 취소
				</TextPrimaryButton>
			)}
			{friendType === "RECEIVED" && (
				<>
					<TextPrimaryButton
						type="button"
						size="small"
						className={styles.positive}
						onClick={() => receivedFriendApprove()}
					>
						수락
					</TextPrimaryButton>
					<TextPrimaryButton
						type="button"
						size="small"
						className={styles.negative}
						onClick={() => receivedFriendRemove()}
					>
						거절
					</TextPrimaryButton>
				</>
			)}
		</div>
	);
};

export default Menu;
