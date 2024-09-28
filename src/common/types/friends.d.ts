import type { UserInfoDTO } from "./users";

import { FRIENDS_TABS } from "../constants/friends";

export type FriendsTab = (typeof FRIENDS_TABS)[number];

export type FriendType = "friend" | "default" | "requested" | "received";

export type HorizontalFriendType = FriendType | "recentCall";

export interface FriendListDTO extends Pick<UserInfoDTO, "email" | "nickname" | "thumbnail"> {
	userId: number;
}
