import { STORAGE_ACCESS_TOKEN_KEY, STORAGE_REFRESH_TOKEN_KEY } from "@/common/constants/storage";
import type { TokenDTO } from "@/common/types/auth";
import type { Nullable } from "@/common/types/utils";

export const getAccessToken = () => {
	return localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
	return localStorage.getItem(STORAGE_REFRESH_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
	localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token);
};

export const setRefreshToken = (token: string) => {
	localStorage.setItem(STORAGE_REFRESH_TOKEN_KEY, token);
};

export const getTokens = (): Nullable<TokenDTO> => {
	return {
		accessToken: getAccessToken(),
		refreshToken: getRefreshToken(),
	};
};

export const setTokens = (tokens: TokenDTO) => {
	setAccessToken(tokens.accessToken);
	setRefreshToken(tokens.refreshToken);
};

export const removeTokens = () => {
	localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
	localStorage.removeItem(STORAGE_REFRESH_TOKEN_KEY);
};
