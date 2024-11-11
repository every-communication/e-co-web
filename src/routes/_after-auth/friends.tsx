import { lazy, Suspense } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { FRIENDS_TABS } from "@/common/constants/friends";
import Loading from "@/components/Common/Loading/Loading";
import DefaultLayout from "@/components/Layout/DefaultLayout";

const schema = z.object({
	tab: z.enum(FRIENDS_TABS).catch(FRIENDS_TABS[0]),
});

const FriendsPage = lazy(() => import("@/pages/Friends"));

export const Route = createFileRoute("/_after-auth/friends")({
	component: () => (
		<DefaultLayout>
			<Suspense fallback={<Loading view />}>
				<FriendsPage />
			</Suspense>
		</DefaultLayout>
	),
	validateSearch: schema.parse,
});
