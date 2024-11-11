import { lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { EMPTY_QUERY_STRING_VALUE } from "@/common/constants/query";

const RegisterCompletePage = lazy(() => import("@/pages/Auth/RegisterComplete"));

const schema = z.object({
	nickname: z.string().catch(EMPTY_QUERY_STRING_VALUE),
	userType: z.enum(["DEAF", "NONDEAF", EMPTY_QUERY_STRING_VALUE]).catch(EMPTY_QUERY_STRING_VALUE),
});

export const Route = createFileRoute("/_auth/auth/register-complete")({
	component: () => <RegisterCompletePage />,
	validateSearch: schema.parse,
});
