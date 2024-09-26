import type { FriendsTab } from "../types/friends";

export const FRIENDS_TABS = ["friends", "requests", "requested"] as const;

export const FRIENDS_TAB_MAPPER: Record<FriendsTab, string> = {
	friends: "친구 목록",
	requested: "요청 받은 친구 목록",
	requests: "요청 중인 칱구 목록",
} as const;
