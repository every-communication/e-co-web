import { useMe } from "@/hooks";

import BaseMenu from "./BaseMenu";

const LogoutMenu: React.FC = () => {
	const { logout } = useMe();

	return <BaseMenu onClick={logout}>로그아웃</BaseMenu>;
};

export default LogoutMenu;
