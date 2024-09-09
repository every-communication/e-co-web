import { Suspense } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Toast } from "@/components/Common/Toast";
import RootLayout from "@/components/Layout/RootLayout";

// TODO: code splitting
export const Route = createRootRoute({
	component: () => (
		<>
			<RootLayout>
				<Outlet />
			</RootLayout>
			<Suspense fallback={null}>
				<Toast />
			</Suspense>
		</>
	),
});
