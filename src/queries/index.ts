import { inferQueryKeyStore, mergeQueryKeys } from "@lukemorales/query-key-factory";

import { auth } from "./auth/_queryKey";
import { friends } from "./friends/_queryKey";
import { users } from "./users/_queryKey";
import { videoTelegraphy } from "./videoTelegraphy/_queryKey";

export const queries = mergeQueryKeys(auth, users, friends, videoTelegraphy);

export type QueryKeys = inferQueryKeyStore<typeof queries>;
