import { useCallback, useEffect, useRef } from "react";

import { io, Socket } from "socket.io-client";

import config from "@/config";

export interface TranslationData {
	result: string | null;
}

type TranslationCallback = (data: TranslationData) => void;

interface ReturnUseTranslation {
	stopTranslation: () => void;
	startTranslation: (video: HTMLVideoElement | null) => void;
}

const useTranslation = (callback: TranslationCallback): ReturnUseTranslation => {
	const socket = useRef<Socket | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const sendVideo = useCallback((video: HTMLVideoElement | null) => {
		if (!socket.current || !video) return;

		try {
			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const context = canvas.getContext("2d");

			if (!context) return;

			context.drawImage(video, 0, 0, canvas.width, canvas.height);

			canvas.toBlob((blob) => {
				if (!blob) return;

				const reader = new FileReader();
				reader.onloadend = () => {
					socket.current?.emit("image", { image: reader.result });
				};
				reader.readAsArrayBuffer(blob);
			}, "image/jpeg");
		} catch (error) {
			console.error("Error in sendVideo:", error);
		}
	}, []);

	const stopTranslation = useCallback(() => {
		if (!intervalRef.current || !socket.current) return;

		clearInterval(intervalRef.current);
		intervalRef.current = null;

		socket.current.off("response", callback);
		socket.current.disconnect();
	}, [callback]);

	const startTranslation = useCallback(
		(video: HTMLVideoElement | null) => {
			if (intervalRef.current) return;

			try {
				socket.current = io(config.TRANSLATION_API_URL, {
					transports: ["websocket"],
					reconnection: true,
					reconnectionAttempts: 5,
					reconnectionDelay: 1000,
					timeout: 10000,
				});

				socket.current.connect();

				intervalRef.current = setInterval(() => sendVideo(video), 200);

				socket.current.on("response", callback);
			} catch (error) {
				console.error("Error starting translation:", error);
			}
		},
		[callback, sendVideo],
	);

	useEffect(() => {
		return () => {
			if (socket.current) {
				stopTranslation();
			}
		};
	}, [stopTranslation]);

	return {
		startTranslation,
		stopTranslation,
	};
};

export default useTranslation;
