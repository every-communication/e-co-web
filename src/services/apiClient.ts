import ky, { type HTTPError } from "ky";

import { UNAUTHORIZED_MESSAGE, UNAUTHORIZED_STATUS } from "@/common/constants/auth";
import { LOGOUT_EVENT_NAME } from "@/common/constants/events";
import type { TokenDTO } from "@/common/types/auth";
import type { ApiResponseDTO, ErrorDTO } from "@/common/types/common";
import config from "@/config";
import { PromiseHolder } from "@/utils/promiseHolder";
import { getTokens, removeTokens, setTokens } from "@/utils/token";

const promiseHolder = new PromiseHolder();

export const apiClient = ky.create({
	prefixUrl: config.API_URL,
});

export const authApiClient = apiClient.extend({
	hooks: {
		beforeRequest: [
			async (request) => {
				if (promiseHolder.isLocked) await promiseHolder.promise;

				const { accessToken, refreshToken } = getTokens();
				if (!accessToken || !refreshToken) void window.dispatchEvent(new CustomEvent(LOGOUT_EVENT_NAME));
				request.headers.set("Authorization", `Bearer ${accessToken}`);
				return request;
			},
		],
		beforeError: [
			async (error) => {
				if (isKyHTTPError(error)) {
					const { message, status } = await getKyHTTPError(error);
					if (message === UNAUTHORIZED_MESSAGE && status === UNAUTHORIZED_STATUS) {
						try {
							const { accessToken, refreshToken } = getTokens();
							if (!accessToken || !refreshToken) throw new Error();

							if (!promiseHolder.isLocked) {
								promiseHolder.hold();

								const { data: refreshData, message: refreshMessage } = await ky
									.post<
										ApiResponseDTO<TokenDTO>
									>(`${config.API_URL}/auth/refresh`, { json: { accessToken, refreshToken } })
									.json();

								if (refreshMessage === UNAUTHORIZED_MESSAGE) throw new Error();
								const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshData;
								setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });

								error.request.headers.set("Authorization", `Bearer ${newAccessToken}`);
								promiseHolder.successRelease();
							} else await promiseHolder.promise;

							void (await authApiClient(error.request));
						} catch {
							promiseHolder.failRelease();
							removeTokens();
							void window.dispatchEvent(new CustomEvent(LOGOUT_EVENT_NAME));
						}
					}
				}

				return error;
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
