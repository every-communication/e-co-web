import { createLazyFileRoute } from "@tanstack/react-router";

import RegisterPage from "@/pages/Auth/Register";

export const Route = createLazyFileRoute("/auth/register")({
	component: () => <RegisterPage />,
});
