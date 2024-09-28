import type { FriendsTab, FriendType } from "../types/friends";

export const FRIENDS_TABS = ["friends", "received", "requested"] as const;

export const FRIENDS_TAB_MAPPER: Record<FriendsTab, string> = {
	friends: "친구 목록",
	received: "요청 받은 친구 목록",
	requested: "요청 중인 친구 목록",
} as const;

export const FRIEND_TYPE_MAPPER: Record<FriendType, string> = {
	default: "",
	friend: "친구",
	received: "친구 요청 받음",
	requested: "친구 요청 중",
} as const;
