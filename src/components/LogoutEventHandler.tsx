import { type ReactNode, useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { LOGOUT_EVENT_NAME, NO_TOKEN_EVENT_NAME } from "@/common/constants/events";
import { useMe, useToast } from "@/hooks";

interface Props {
	children: ReactNode;
}

const LogoutEventHandler: React.FC<Props> = ({ children }) => {
	const { addToast } = useToast();
	const { logout } = useMe();
	const navigate = useNavigate();

	useEffect(() => {
		const handler = () => {
			addToast({ message: "세션이 만료되었습니다. 다시 로그인해주세요.", state: "informative" });
			logout();
			navigate({ to: "/auth", replace: true });
		};

		const noTokensHandler = () => {
			logout();
			navigate({ to: "/auth", replace: true });
		};

		window.addEventListener(LOGOUT_EVENT_NAME, handler);
		window.addEventListener(NO_TOKEN_EVENT_NAME, noTokensHandler);
		return () => {
			window.removeEventListener(LOGOUT_EVENT_NAME, handler);
			window.removeEventListener(NO_TOKEN_EVENT_NAME, noTokensHandler);
		};
	}, [addToast, logout, navigate]);

	return <>{children}</>;
};

export default LogoutEventHandler;
