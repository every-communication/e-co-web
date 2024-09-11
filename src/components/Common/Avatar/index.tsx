import type { CSSProperties, ReactEventHandler } from "react";

import cx from "clsx";

import { imageDefaultAvatar } from "@/assets/images";

import styles from "./Avatar.module.scss";

interface Props {
	size: number;
	src?: string | null;
	className?: string;
}

const Avatar: React.FC<Props> = ({ size, src, className }) => {
	const style = { "--size": size } as CSSProperties;

	const onError: ReactEventHandler<HTMLImageElement> = (e) => {
		e.currentTarget.src = imageDefaultAvatar;
	};

	return (
		<img
			src={src || imageDefaultAvatar}
			alt="avatar"
			onError={onError}
			className={cx(styles.wrapper, className)}
			style={style}
		/>
	);
};

export default Avatar;
