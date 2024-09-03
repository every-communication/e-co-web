import { Suspense } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "@/pages/Auth";

export const Route = createFileRoute("/auth/")({
	component: () => (
		<Suspense fallback={null}>
			<LoginPage />,
		</Suspense>
	),
});
