import { createQueryKeys } from "@lukemorales/query-key-factory";

export const friends = createQueryKeys("friends", {
	getFriends: ["getFriends"],
	getRequestedFriends: ["getRequestedFriends"],
	getReceivedFriends: ["getReceivedFriends"],
});
