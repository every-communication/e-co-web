import * as React from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<React.Fragment>
			<Outlet />
		</React.Fragment>
	),
});
