import { lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { EMPTY_QUERY_STRING_VALUE } from "@/common/constants/query";

const schema = z.object({
	id: z.string().catch(EMPTY_QUERY_STRING_VALUE),
});

const OAuthRegisterPage = lazy(() => import("@/pages/Auth/OAuthRegister"));

export const Route = createFileRoute("/_auth/auth/oauth-register")({
	component: () => <OAuthRegisterPage />,
	validateSearch: schema.parse,
});
