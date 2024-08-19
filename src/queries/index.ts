import { inferQueryKeyStore, mergeQueryKeys } from "@lukemorales/query-key-factory";

import { users } from "./users/_queryKey";

export const queries = mergeQueryKeys(users);

export type QueryKeys = inferQueryKeyStore<typeof queries>;
