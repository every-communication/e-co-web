import type { ChangeEventHandler } from "react";

import UserTypeChecker from "@/components/User/UserTypeChecker";
import { useMe } from "@/hooks";

import styles from "./userType.module.scss";

// FIXME: 정보 수정 기능
const UserType: React.FC = () => {
	const { me } = useMe();

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { value } = e.currentTarget;
	};

	return <UserTypeChecker userType={me.userType} onChange={onChange} />;
};

export default UserType;
