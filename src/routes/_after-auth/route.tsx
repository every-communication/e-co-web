import { createFileRoute, Outlet } from "@tanstack/react-router";

import AfterAuthorizedLayout from "@/components/Layout/Authorization/AfterAuthorizedLayout";

export const Route = createFileRoute("/_after-auth")({
	component: () => (
		<AfterAuthorizedLayout>
			<Outlet />
		</AfterAuthorizedLayout>
	),
});
