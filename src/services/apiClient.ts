import ky from "ky";

import config from "@/config";

export const apiClient = ky.create({
	prefixUrl: config.API_URL,
});
