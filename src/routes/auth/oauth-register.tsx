import { lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { EMPTY_QUERY_STRING_VALUE } from "@/common/constants/query";

const schema = z.object({
	id: z.string().catch(EMPTY_QUERY_STRING_VALUE),
	thumbnail: z.string().optional(),
});

const OAuthRegisterPage = lazy(() => import("@/pages/Auth/OAuthRegister"));

export const Route = createFileRoute("/auth/oauth-register")({
	component: () => <OAuthRegisterPage />,
	validateSearch: schema.parse,
});
