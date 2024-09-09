import ky, { type HTTPError } from "ky";

import type { ErrorDTO } from "@/common/types/common";
import config from "@/config";

export const apiClient = ky.create({
	prefixUrl: config.API_URL,
});

export const authApiClient = apiClient.extend({});

export const isKyHTTPError = (error: unknown): error is HTTPError<ErrorDTO> => {
	return error instanceof Error && "response" in error && "request" in error && "options" in error;
};

export const getKyHTTPError = async (error: HTTPError<ErrorDTO>): Promise<ErrorDTO> => {
	return await error.response.json<ErrorDTO>();
};
