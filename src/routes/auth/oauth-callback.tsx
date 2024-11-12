import { lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { EMPTY_QUERY_STRING_VALUE } from "@/common/constants/query";

const schema = z.object({
	accessToken: z.string().catch(EMPTY_QUERY_STRING_VALUE),
	refreshToken: z.string().catch(EMPTY_QUERY_STRING_VALUE),
});

const OAuthCallbackPage = lazy(() => import("@/pages/Auth/OAuthCallback"));

export const Route = createFileRoute("/auth/oauth-callback")({
	component: () => <OAuthCallbackPage />,
	validateSearch: schema.parse,
});
