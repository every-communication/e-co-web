import { createFileRoute, Outlet } from "@tanstack/react-router";

import BeforeAuthorizedLayout from "@/components/Layout/Authorization/BeforeAuthorizedLayout";

export const Route = createFileRoute("/_auth/auth")({
	component: () => (
		<BeforeAuthorizedLayout>
			<Outlet />
		</BeforeAuthorizedLayout>
	),
});
