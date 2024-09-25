import { type ReactNode } from "react";

import { Navigate } from "@tanstack/react-router";

import Loading from "@/components/Common/Loading/Loading";
import { useMe } from "@/hooks";

interface Props {
	children: ReactNode;
}

const BeforeAuthorizedLayout: React.FC<Props> = ({ children }) => {
	const { isLoading, isLogined } = useMe();

	if (isLoading) return <Loading view />;
	if (isLogined) return <Navigate to="/" replace />;

	return <>{children}</>;
};

export default BeforeAuthorizedLayout;
