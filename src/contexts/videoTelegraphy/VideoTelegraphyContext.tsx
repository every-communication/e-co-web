import { createContext, type ReactNode } from "react";

import { useParams } from "@tanstack/react-router";

import { type ReturnUseVideoTelegraphySocket, useVideoTelegraphySocket } from "@/hooks/useVideoTelegraphySocket";

export const VideoTelegraphyContext = createContext<ReturnUseVideoTelegraphySocket | null>(null);

interface VideoTelegraphyProviderProps {
	children: ReactNode;
}

export const VideoTelegraphyProvider: React.FC<VideoTelegraphyProviderProps> = ({ children }) => {
	const { code } = useParams({ from: "/video-telegraphy/$code" });
	const videoTelegraphySocket = useVideoTelegraphySocket(code);

	return <VideoTelegraphyContext.Provider value={videoTelegraphySocket}>{children}</VideoTelegraphyContext.Provider>;
};
