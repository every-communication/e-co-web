import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_ME_KEY } from "@/common/constants/storage";
import type { UserInfoDTO } from "@/common/types/users";

interface State {
	isLogined: boolean;
	me: UserInfoDTO | null;
}

interface Action {
	setMe: (me: UserInfoDTO) => void;
	clear: () => void;
}

export type MeStore = State & Action;

export const useMeStore = create<MeStore>()(
	persist(
		(set) => ({
			isLogined: false,
			me: null,
			setMe: (me) => set({ me, isLogined: true }),
			clear: () => set({ me: null, isLogined: false }),
		}),
		{ name: STORAGE_ME_KEY },
	),
);
