import Skeleton from "react-loading-skeleton";

import cx from "clsx";

import { FRIEND_TYPE_MAPPER } from "@/common/constants/friends";
import type { FriendType } from "@/common/types/friends";

import styles from "./friendTag.module.scss";

interface Props {
	className?: string;
	friendType: FriendType;
}

const FriendTag: React.FC<Props> = ({ friendType, className }) => {
	if (friendType === "default") return null;

	return <span className={cx(styles.wrapper, styles[friendType], className)}>{FRIEND_TYPE_MAPPER[friendType]}</span>;
};

export default FriendTag;

export const LoadingFriendTag: React.FC = () => {
	return <Skeleton width={40} />;
};
