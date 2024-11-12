import { type ReactNode, useEffect } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import Loading from "@/components/Common/Loading/Loading";
import { useToast } from "@/hooks";
import { useCheckOAuthIdValidQuery } from "@/queries/auth/queries";

interface Props {
	children: ReactNode;
}

const OAuthValidChecker: React.FC<Props> = ({ children }) => {
	const { id } = useSearch({ from: "/_auth/auth/oauth-register" });
	const navigate = useNavigate();

	const { addToast } = useToast();

	const { data, isFetching, isError } = useCheckOAuthIdValidQuery(id);

	useEffect(() => {
		if ((typeof data === "boolean" && !data) || isError) {
			navigate({ to: "/auth", replace: true });
			addToast({ message: "잘못된 접근입니다.", state: "negative" });
		}
	}, [addToast, data, isError, navigate]);

	if (isFetching) return <Loading view />;

	return <>{children}</>;
};

export default OAuthValidChecker;
