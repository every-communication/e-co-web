import { createLazyFileRoute } from "@tanstack/react-router";

import LoginPage from "@/pages/Auth";

export const Route = createLazyFileRoute("/auth/")({
	component: () => <LoginPage />,
});
