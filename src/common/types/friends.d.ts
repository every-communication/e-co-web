import type { UserInfoDTO } from "./users";

import { FRIENDS_TABS } from "../constants/friends";

export type FriendsTab = (typeof FRIENDS_TABS)[number];

export interface FriendListDTO extends Pick<UserInfoDTO, "email" | "nickname" | "thumbnail"> {
	userId: number;
}
