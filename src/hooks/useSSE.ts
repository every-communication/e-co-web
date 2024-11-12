import { useEffect } from "react";

import { EventSourcePolyfill } from "event-source-polyfill";

import config from "@/config";
import { getBearerToken, getTokens } from "@/utils/token";

export const useSSE = (url: string) => {
	const { accessToken } = getTokens();

	useEffect(() => {
		const connect = () => {
			const eventSource = new EventSourcePolyfill(`${config.API_URL}${url}`, {
				headers: {
					Authorization: getBearerToken(accessToken!),
				},
			});

			eventSource.addEventListener("message", () => {
				console.log("message");
			});

			return () => {
				eventSource.close();
			};
		};

		return connect();
	}, [accessToken, url]);
};
