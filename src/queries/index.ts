import { inferQueryKeyStore, mergeQueryKeys } from "@lukemorales/query-key-factory";

import { auth } from "./auth/_queryKey";

export const queries = mergeQueryKeys(auth);

export type QueryKeys = inferQueryKeyStore<typeof queries>;
