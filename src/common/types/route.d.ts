import type { RootRouter } from "@/main";
import type { RoutesByPath } from "@tanstack/react-router";

export type Paths = keyof RoutesByPath<RootRouter["routeTree"]>;
