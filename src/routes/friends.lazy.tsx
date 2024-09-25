import { createLazyFileRoute } from "@tanstack/react-router";

import DefaultLayout from "@/components/Layout/DefaultLayout";

export const Route = createLazyFileRoute("/friends")({
	component: () => <DefaultLayout>Friends Page</DefaultLayout>,
});
