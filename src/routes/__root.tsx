import { Suspense } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Toast } from "@/components/Common/Toast";
import RootLayout from "@/components/Layout/RootLayout";
import LogoutEventHandler from "@/components/LogoutEventHandler";

export const Route = createRootRoute({
	component: () => (
		<>
			<LogoutEventHandler>
				<RootLayout>
					<Outlet />
				</RootLayout>
			</LogoutEventHandler>
			<Suspense fallback={null}>
				<Toast />
			</Suspense>
		</>
	),
});
