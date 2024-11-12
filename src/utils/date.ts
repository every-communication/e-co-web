import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatDuration = (isoDuration: string | null) => {
	if (!isoDuration) return "00분 00초";
	const seconds = parseFloat(isoDuration.replace(/[PT]|S/g, ""));
	const duration = dayjs.duration(seconds, "seconds");

	return seconds >= 3600 ? duration.format("HH시간 mm분 ss초") : duration.format("mm분 ss초");
};
