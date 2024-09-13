import type { ChangeEventHandler } from "react";

import cx from "clsx";

import type { UserType } from "@/common/types/users";

import UserTypeCheckerItem from "./UserTypeCheckerItem";

import styles from "./userTypeChecker.module.scss";

interface Props {
	userType?: UserType | null;
	onChange: ChangeEventHandler<HTMLInputElement>;
	className?: string;
}

const UserTypeChecker: React.FC<Props> = ({ userType, className, onChange }) => {
	return (
		<fieldset className={cx(styles.wrapper, className)} aria-label="user type checker">
			<UserTypeCheckerItem
				title="농인이에요"
				description="수어 서비스가 필요해요"
				value="DEAF"
				onChange={onChange}
				checked={userType === "DEAF"}
			/>
			<UserTypeCheckerItem
				title="청인이에요"
				description="수어 해석이 필요해요"
				value="NODEAF"
				onChange={onChange}
				checked={userType === "NODEAF"}
			/>
		</fieldset>
	);
};

export default UserTypeChecker;
