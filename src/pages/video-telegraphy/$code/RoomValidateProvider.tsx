import { type ReactNode, useCallback, useEffect, useMemo } from "react";

import { useNavigate, useParams } from "@tanstack/react-router";

import Loading from "@/components/Common/Loading/Loading";
import { VideoTelegraphyProvider } from "@/contexts/videoTelegraphy/VideoTelegraphyContext";
import { useToast } from "@/hooks";
import { useGetRoomQuery } from "@/queries/videoTelegraphy/queries";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";

interface Props {
	children: ReactNode;
}

const RoomValidateProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();
	const { code } = useParams({ from: "/video-telegraphy/$code" });

	const { addToast } = useToast();

	const { isLoading, error, isError } = useGetRoomQuery(code);

	const handleError = useCallback(async () => {
		if (!error || !isKyHTTPError(error)) return;
		const { message } = await getKyHTTPError(error);
		addToast({ message, state: "negative" });
		navigate({ to: "/", replace: true });
	}, [addToast, error, navigate]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	if (isLoading || isError) return <Loading view />;

	return <VideoTelegraphyProvider>{children}</VideoTelegraphyProvider>;
};

export default RoomValidateProvider;
