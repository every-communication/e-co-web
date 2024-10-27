/* eslint-disable jsx-a11y/media-has-caption */

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "@tanstack/react-router";
import cx from "clsx";

import { IconCamera, IconCopy, IconMic, IconPhoneOff } from "@/assets/icons/videoTelegraphy";
import { JOINED_ROOM_EVENT_NAME, LEFT_ROOM_EVENT_NAME } from "@/common/constants/events";
import AfterAuthorizedLayout from "@/components/Layout/Authorization/AfterAuthorizedLayout";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import { useToast } from "@/hooks";
import useElementSize from "@/hooks/useElementSize";
import useTranslation, { TranslationData } from "@/hooks/useTranslation";
import { useVideoTelegraphy } from "@/hooks/useVideoTelegraphy";
import { useGetRoomQuery } from "@/queries/videoTelegraphy/queries";
import { ServerTranslatedData } from "@/utils/videoTelegraphy/types";

import styles from "./videoTelegraphyPage.module.scss";

const VideoTelegraphyPage: React.FC = () => {
	const { code } = useParams({ from: "/video-telegraphy/$code" });
	const navigate = useNavigate();

	const [translated, setTranslated] = useState<string>("");
	const { addToast } = useToast();
	const { data, refetch } = useGetRoomQuery(code);
	const {
		connectState,
		setUpLocalStream,
		clearLocalStream,
		sendTranslation,
		addEventListener,
		joinRoom,
		leaveRoom,
		createWebSocket,
		close,
	} = useVideoTelegraphy();

	const user1Id = data?.data.user1Id;
	const user2Id = data?.data.user2Id;
	const userCount = Boolean(user1Id) && Boolean(user2Id) ? 2 : 1;

	const localVideo = useRef<HTMLVideoElement>(null);
	const remoteVideo = useRef<HTMLVideoElement>(null);

	const { height } = useElementSize(localVideo);
	const translatedStyle = { "--top": `${height / 2}px` } as CSSProperties;

	const handleTranslation = useCallback(
		(data: TranslationData) => {
			if (!data.result) return;
			sendTranslation(data.result);
		},
		[sendTranslation],
	);

	const { startTranslation, stopTranslation } = useTranslation(handleTranslation);

	const onClickEndCall = () => {
		leaveRoom();
		close();
		clearLocalStream();
		stopTranslation();
		navigate({ to: "/", replace: true });
	};

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code);
			addToast({ message: "코드를 복사하였습니다.", state: "positive" });
		} catch {
			addToast({ message: "코드 복사에 실패하였습니다.", state: "negative" });
		}
	};

	const translatedCallback = useCallback(({ message }: ServerTranslatedData) => {
		setTranslated(message);
	}, []);

	useEffect(() => {
		createWebSocket();
	}, [createWebSocket]);

	useEffect(() => {
		startTranslation(localVideo.current);

		return () => {
			stopTranslation();
		};
	}, [handleTranslation, startTranslation, stopTranslation]);

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
		if (connectState !== "OPEN" || !localVideo.current || !remoteVideo.current) return;

		const localVideoElement = localVideo.current;
		const oppositeVideoElement = remoteVideo.current;

		setUpLocalStream(localVideoElement).then(() => {
			addEventListener({ localVideoElement, oppositeVideoElement, translatedCallback });
			leaveRoom();
			joinRoom();
		});

		return () => {
			clearLocalStream();
			leaveRoom();
			close();
		};
	}, [
		addEventListener,
		clearLocalStream,
		close,
		connectState,
		joinRoom,
		leaveRoom,
		setUpLocalStream,
		translatedCallback,
	]);

	return (
		<AfterAuthorizedLayout>
			<HeightFitLayout className={cx(styles.wrapper, { [styles.allParticipated]: userCount === 2 })}>
				<button type="button" className={styles.copy} onClick={copyCode}>
					CODE {code}
					<IconCopy />
				</button>
				{translated && userCount === 2 && (
					<div className={styles.translated} style={translatedStyle}>
						{translated}
					</div>
				)}
				<video ref={localVideo} className={styles.localVideo} />
				<video ref={remoteVideo} className={styles.remoteVideo} />
				<div className={styles.menu}>
					<button type="button" aria-label="toggle mic" className={styles.enabled}>
						<IconMic />
					</button>
					<button type="button" aria-label="end call" className={styles.endCall} onClick={onClickEndCall}>
						<IconPhoneOff />
					</button>
					<button type="button" aria-label="toggle camera" className={styles.enabled}>
						<IconCamera />
					</button>
				</div>
			</HeightFitLayout>
		</AfterAuthorizedLayout>
	);
};

export default VideoTelegraphyPage;
