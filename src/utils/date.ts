import dayjs from "dayjs";

export const formatDuration = (duration: number) => {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = duration % 60;

	if (hours > 0) return `${hours}시간 ${minutes}분 ${seconds}초`;
	if (minutes > 0) return `${minutes}분 ${seconds}초`;
	return `${seconds}초`;
};

export { dayjs };
