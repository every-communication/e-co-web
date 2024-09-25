import { createLazyFileRoute } from "@tanstack/react-router";

import DefaultLayout from "@/components/Layout/DefaultLayout";
import HomePage from "@/pages/Home";

export const Route = createLazyFileRoute("/")({
	component: () => (
		<DefaultLayout>
			<HomePage />
		</DefaultLayout>
	),
});
