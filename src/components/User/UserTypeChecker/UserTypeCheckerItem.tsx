import type { ComponentProps } from "react";

import type { UserType } from "@/common/types/uesrs";

import styles from "./userTypeCheckerItem.module.scss";

interface Props extends Omit<ComponentProps<"input">, "value"> {
	title: string;
	description: string;
	value: UserType;
}

const UserTypeCheckerItem: React.FC<Props> = ({ title, description, value, checked, onChange, ...props }) => {
	return (
		<label className={styles.wrapper}>
			<span className={styles.title}>{title}</span>
			<span className={styles.desc}>{description}</span>
			<input type="radio" value={value} checked={checked} onChange={onChange} hidden {...props} />
		</label>
	);
};

export default UserTypeCheckerItem;
