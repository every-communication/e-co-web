import { createFileRoute, Navigate } from "@tanstack/react-router";

// TODO: authorization check
export const Route = createFileRoute("/")({
	component: () => <Navigate to="/auth" />,
});
