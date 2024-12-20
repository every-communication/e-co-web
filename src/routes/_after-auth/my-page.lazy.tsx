import { createLazyFileRoute } from "@tanstack/react-router";

import DefaultLayout from "@/components/Layout/DefaultLayout";
import MyPage from "@/pages/My";

export const Route = createLazyFileRoute("/_after-auth/my-page")({
	component: () => (
		<DefaultLayout>
			<MyPage />
		</DefaultLayout>
	),
});
