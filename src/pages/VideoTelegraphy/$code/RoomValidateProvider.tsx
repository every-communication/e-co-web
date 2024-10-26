import { type ReactNode, useCallback, useEffect } from "react";

import { useNavigate, useParams } from "@tanstack/react-router";

import Loading from "@/components/Common/Loading/Loading";
import { VideoTelegraphyProvider } from "@/contexts/videoTelegraphy/VideoTelegraphyContext";
import { useToast } from "@/hooks";
import { useGetRoomQuery } from "@/queries/videoTelegraphy/queries";

interface Props {
	children: ReactNode;
}

const RoomValidateProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();
	const { code } = useParams({ from: "/video-telegraphy/$code" });

	const { addToast } = useToast();

	const { isLoading, isError } = useGetRoomQuery(code);

	const handleError = useCallback(() => {
		if (!isError) return;
		addToast({ message: "존재하지 않는 방이거나, 통화가 진행 중인 방입니다.", state: "negative" });
		navigate({ to: "/", replace: true });
	}, [addToast, isError, navigate]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	if (isLoading || isError) return <Loading view />;

	return <VideoTelegraphyProvider>{children}</VideoTelegraphyProvider>;
};

export default RoomValidateProvider;
