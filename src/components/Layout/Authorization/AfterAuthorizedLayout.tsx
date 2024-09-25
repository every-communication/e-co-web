import { type ReactNode } from "react";

import { Navigate } from "@tanstack/react-router";

import { useMe } from "@/hooks";

import Loading from "../../Common/Loading/Loading";

interface Props {
	children: ReactNode;
}

const AfterAuthorizedLayout: React.FC<Props> = ({ children }) => {
	const { isLoading, isLogined } = useMe();

	if (isLoading) return <Loading view />;
	if (!isLogined) return <Navigate to="/auth" replace />;

	return <>{children}</>;
};

export default AfterAuthorizedLayout;
