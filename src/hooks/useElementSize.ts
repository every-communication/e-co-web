import { type RefObject, useMemo, useSyncExternalStore } from "react";

interface Size {
	width: number;
	height: number;
}

const subscribe = (callback: () => void) => {
	window.addEventListener("resize", callback);
	return () => {
		window.removeEventListener("resize", callback);
	};
};

const useElementSize = (ref: RefObject<HTMLElement>): Size => {
	const size = useSyncExternalStore(subscribe, () =>
		JSON.stringify({
			width: ref.current?.offsetWidth ?? 0,
			height: ref.current?.offsetHeight ?? 0,
		}),
	);

	return useMemo<Size>(() => JSON.parse(size) as Size, [size]);
};

export default useElementSize;
