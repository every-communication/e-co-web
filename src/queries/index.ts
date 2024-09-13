import { inferQueryKeyStore, mergeQueryKeys } from "@lukemorales/query-key-factory";

import { auth } from "./auth/_queryKey";
import { users } from "./users/_queryKey";

export const queries = mergeQueryKeys(auth, users);

export type QueryKeys = inferQueryKeyStore<typeof queries>;
