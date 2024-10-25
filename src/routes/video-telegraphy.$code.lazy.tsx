import { createLazyFileRoute } from "@tanstack/react-router";

import VideoTelegraphyPage from "@/pages/video-telegraphy/$code";

export const Route = createLazyFileRoute("/video-telegraphy/$code")({
	component: () => <VideoTelegraphyPage />,
});
