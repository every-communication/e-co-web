const PREFIX = "VITE_";

const getConfig = (name: string): string => {
	const configName = `${PREFIX}${name}`;
	if (configName in import.meta.env) {
		return import.meta.env[configName] as string;
	} else throw Error("잘못된 CONFIG 입니다.");
};

export default {
	PORT: getConfig("PORT"),
	API_URL: getConfig("API_URL"),
	SIGNALING_API_URL: getConfig("SIGNALING_API_URL"),
};
