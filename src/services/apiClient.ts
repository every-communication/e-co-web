import ky, { type HTTPError } from "ky";

import { LOGOUT_EVENT_NAME } from "@/common/constants/events";
import type { ErrorDTO } from "@/common/types/common";
import config from "@/config";
import { getTokens } from "@/utils/token";

export const apiClient = ky.create({
	prefixUrl: config.API_URL,
});

// TODO: apply refresh api when afterResponse
export const authApiClient = apiClient.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				const { accessToken, refreshToken } = getTokens();
				if (!accessToken || !refreshToken) void window.dispatchEvent(new CustomEvent(LOGOUT_EVENT_NAME));
				request.headers.set("Authorization", `Bearer ${accessToken}`);
				return request;
			},
		],
		afterResponse: [
			(request, options, response) => {
				return response;
			},
		],
	},
});

export const isKyHTTPError = (error: unknown): error is HTTPError<ErrorDTO> => {
	return error instanceof Error && "response" in error && "request" in error && "options" in error;
};

export const getKyHTTPError = async (error: HTTPError<ErrorDTO>): Promise<ErrorDTO> => {
	return await error.response.json<ErrorDTO>();
};
