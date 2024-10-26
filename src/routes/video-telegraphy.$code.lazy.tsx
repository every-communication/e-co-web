import { createLazyFileRoute } from "@tanstack/react-router";

import VideoTelegraphyPage from "@/pages/video-telegraphy/$code";
import RoomValidateProvider from "@/pages/video-telegraphy/$code/RoomValidateProvider";

export const Route = createLazyFileRoute("/video-telegraphy/$code")({
	component: () => (
		<RoomValidateProvider>
			<VideoTelegraphyPage />
		</RoomValidateProvider>
	),
});
