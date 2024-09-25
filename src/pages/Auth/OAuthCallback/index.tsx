import { useCallback, useEffect } from "react";

import { useSearch } from "@tanstack/react-router";

import Loading from "@/components/Common/Loading/Loading";
import QueryValidChecker from "@/components/QueryValidChecker";
import { useMe } from "@/hooks";
import { setTokens } from "@/utils/token";

const OAuthCallbackPage: React.FC = () => {
	const { accessToken, refreshToken } = useSearch({ from: "/auth/oauth-callback" });

	const { refetchMe } = useMe();

	const login = useCallback(async () => {
		setTokens({ accessToken, refreshToken });
		await refetchMe();
	}, [accessToken, refetchMe, refreshToken]);

	useEffect(() => {
		if (!accessToken || !refreshToken) return;
		login();
	}, [accessToken, login, refreshToken]);

	return (
		<QueryValidChecker search={{ accessToken, refreshToken }} redirectTo="/">
			<Loading view />
		</QueryValidChecker>
	);
};

export default OAuthCallbackPage;
