import { createLazyFileRoute } from "@tanstack/react-router";

import VideoTelegraphyPage from "@/pages/VideoTelegraphy/$code";
import RoomValidateProvider from "@/pages/VideoTelegraphy/$code/RoomValidateProvider";

export const Route = createLazyFileRoute("/_after-auth/video-telegraphy/$code")({
	component: () => (
		<RoomValidateProvider>
			<VideoTelegraphyPage />
		</RoomValidateProvider>
	),
});
