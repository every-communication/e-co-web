import { createLazyFileRoute } from "@tanstack/react-router";

import RegisterPage from "@/pages/Auth/Register";

export const Route = createLazyFileRoute("/_auth/auth/register")({
	component: () => <RegisterPage />,
});
