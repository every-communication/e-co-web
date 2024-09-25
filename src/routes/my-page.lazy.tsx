import { createLazyFileRoute } from "@tanstack/react-router";

import DefaultLayout from "@/components/Layout/DefaultLayout";

export const Route = createLazyFileRoute("/my-page")({
	component: () => <DefaultLayout>MyPage</DefaultLayout>,
});
