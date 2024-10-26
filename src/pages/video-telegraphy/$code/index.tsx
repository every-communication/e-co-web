/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useRef } from "react";

import { useParams } from "@tanstack/react-router";
import cx from "clsx";

import { JOINED_ROOM_EVENT_NAME, LEFT_ROOM_EVENT_NAME } from "@/common/constants/events";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import { useVideoTelegraphy } from "@/hooks/useVideoTelegraphy";
import { useGetRoomQuery } from "@/queries/videoTelegraphy/queries";

import styles from "./videoTelegraphyPage.module.scss";

const VideoTelegraphyPage: React.FC = () => {
	const { code } = useParams({ from: "/video-telegraphy/$code" });

	const { data, refetch } = useGetRoomQuery(code);
	const { connectState, addEventListener, joinRoom, leaveRoom, createWebSocket } = useVideoTelegraphy();

	const user1Id = data?.data.user1Id;
	const user2Id = data?.data.user2Id;
	const userCount = Boolean(user1Id) && Boolean(user2Id) ? 2 : 1;

	const localVideo = useRef<HTMLVideoElement>(null);
	const remoteVideo = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		createWebSocket();
	}, [createWebSocket]);

	useEffect(() => {
		const handler = () => {
			refetch();
		};

		window.addEventListener(JOINED_ROOM_EVENT_NAME, handler);
		window.addEventListener(LEFT_ROOM_EVENT_NAME, handler);

		return () => {
			window.removeEventListener(JOINED_ROOM_EVENT_NAME, handler);
			window.removeEventListener(LEFT_ROOM_EVENT_NAME, handler);
		};
	}, [refetch]);

	useEffect(() => {
		if (connectState !== WebSocket.OPEN) return;

		addEventListener({
			localVideoElement: localVideo.current!,
			oppositeVideoElement: remoteVideo.current!,
		});
		leaveRoom();
		joinRoom();
	}, [addEventListener, connectState, joinRoom, leaveRoom]);

	return (
		<HeightFitLayout className={cx(styles.wrapper, { [styles.allParticipated]: userCount === 1 })}>
			<video ref={localVideo} className={styles.localVideo} />
			<video ref={remoteVideo} className={styles.remoteVideo} />
		</HeightFitLayout>
	);
};

export default VideoTelegraphyPage;
