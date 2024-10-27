import type { CSSProperties, ReactEventHandler } from "react";

import cx from "clsx";

import { IconPencil } from "@/assets/icons/common";
import { imageDefaultAvatar } from "@/assets/images";

import styles from "./avatar.module.scss";

interface Props {
	size: number;
	src?: string | null;
	className?: string;
	hasEdit?: boolean;
}

const Avatar: React.FC<Props> = ({ size, src, className, hasEdit = false }) => {
	const style = { "--size": `${size}px` } as CSSProperties;

	const onError: ReactEventHandler<HTMLImageElement> = (e) => {
		e.currentTarget.src = imageDefaultAvatar;
	};

	return (
		<div className={styles.wrapper} style={style}>
			<img src={src || imageDefaultAvatar} alt="avatar" onError={onError} className={cx(styles.image, className)} />
			{hasEdit && (
				<button type="button" className={styles.editButton}>
					<IconPencil />
				</button>
			)}
		</div>
	);
};

export default Avatar;
