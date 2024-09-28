import type { UserInfoDTO } from "./users";

import { FRIENDS_TABS } from "../constants/friends";

export type FriendsTab = (typeof FRIENDS_TABS)[number];

export type FriendType = "FRIEND" | "DEFAULT" | "REQUESTED" | "RECEIVED";

export interface FriendListDTO extends Pick<UserInfoDTO, "email" | "nickname" | "thumbnail"> {
	userId: number;
}

export interface FriendSearchDTO extends Pick<UserInfoDTO, "email" | "nickname" | "thumbnail"> {
	userId: number;
	friendType: FriendType;
}
