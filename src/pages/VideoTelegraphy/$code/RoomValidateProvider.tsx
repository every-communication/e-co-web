import { type ReactNode, useCallback, useEffect } from "react";

import { useNavigate, useParams } from "@tanstack/react-router";

import Loading from "@/components/Common/Loading/Loading";
import { VideoTelegraphyProvider } from "@/contexts/videoTelegraphy/VideoTelegraphyContext";
import { useMe, useToast } from "@/hooks";
import { useGetRoomQuery } from "@/queries/videoTelegraphy/queries";

interface Props {
	children: ReactNode;
}

const RoomValidateProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();
	const { me } = useMe();
	const { code } = useParams({ from: "/_after-auth/video-telegraphy/$code" });

	const { addToast } = useToast();

	const { isLoading, isError, data, isSuccess } = useGetRoomQuery(code);

	const handleError = useCallback(() => {
		if (!isError) return;
		addToast({ message: "존재하지 않는 방이거나, 통화가 진행 중인 방입니다.", state: "negative" });
		navigate({ to: "/", replace: true });
	}, [addToast, isError, navigate]);

	const handleCheckRoomJoinable = useCallback(() => {
		if (!isSuccess || !data) return;
		const { ownerId, friendId } = data.data;
		if (Boolean(ownerId) && Boolean(friendId) && ![ownerId, friendId].includes(me.id)) {
			addToast({ message: "참여할 수 없는 방입니다.", state: "negative" });
			navigate({ to: "/", replace: true });
		}
	}, [addToast, data, isSuccess, me.id, navigate]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	useEffect(() => {
		handleCheckRoomJoinable();
	}, [handleCheckRoomJoinable]);

	if (isLoading || isError) return <Loading view />;

	return <VideoTelegraphyProvider>{children}</VideoTelegraphyProvider>;
};

export default RoomValidateProvider;
