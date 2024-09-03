import { createRootRoute, Outlet } from "@tanstack/react-router";

import RootLayout from "@/components/Layout/RootLayout";

// TODO: code splitting
export const Route = createRootRoute({
	component: () => (
		<RootLayout>
			<Outlet />
		</RootLayout>
	),
});
