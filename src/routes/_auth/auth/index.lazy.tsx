import { createLazyFileRoute } from "@tanstack/react-router";

import LoginPage from "@/pages/Auth";

export const Route = createLazyFileRoute("/_auth/auth/")({
	component: () => <LoginPage />,
});
