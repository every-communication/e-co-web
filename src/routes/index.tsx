import { createFileRoute, Navigate } from "@tanstack/react-router";

import DefaultLayout from "@/components/Layout/DefaultLayout";

// TODO: authorization check
export const Route = createFileRoute("/")({
	component: () => <DefaultLayout>Main</DefaultLayout>,
});
