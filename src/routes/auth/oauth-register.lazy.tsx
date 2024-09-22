import { createLazyFileRoute } from "@tanstack/react-router";

import OAuthRegisterPage from "@/pages/Auth/OAuthRegister";

export const Route = createLazyFileRoute("/auth/oauth-register")({
	component: () => <OAuthRegisterPage />,
});
