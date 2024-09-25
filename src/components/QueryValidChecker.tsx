import { type ReactNode, useLayoutEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { EMPTY_QUERY_NUMBER_VALUE, EMPTY_QUERY_STRING_VALUE } from "@/common/constants/query";
import type { Paths } from "@/common/types/route";

interface Props {
	search: Record<string, unknown>;
	redirectTo: Paths;
	children: ReactNode;
}

const QueryValidChecker: React.FC<Props> = ({ children, redirectTo, search }) => {
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (
			Object.values(search).includes(EMPTY_QUERY_NUMBER_VALUE) ||
			Object.values(search).includes(EMPTY_QUERY_STRING_VALUE)
		) {
			navigate({ to: redirectTo, replace: true });
		}
	}, [navigate, redirectTo, search]);

	return <>{children}</>;
};

export default QueryValidChecker;
