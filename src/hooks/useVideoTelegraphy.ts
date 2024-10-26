import { useContext } from "react";

import type { ReturnUseVideoTelegraphySocket } from "./useVideoTelegraphySocket";
import { VideoTelegraphyContext } from "@/contexts/videoTelegraphy/VideoTelegraphyContext";

export const useVideoTelegraphy = (): ReturnUseVideoTelegraphySocket => {
	const videoTelegraphyContext = useContext(VideoTelegraphyContext);

	if (!videoTelegraphyContext) {
		throw new Error("useVideoTelegraphy must be used within a VideoTelegraphyProvider");
	}

	return videoTelegraphyContext;
};
