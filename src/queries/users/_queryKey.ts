import { createQueryKeys } from "@lukemorales/query-key-factory";

export const users = createQueryKeys("users", {
	getUsers: ["getUsers"],
	getUser: (userId: string) => ["getUser", { userId }],
});
