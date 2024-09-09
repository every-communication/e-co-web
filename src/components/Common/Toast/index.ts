import { lazy } from "react";

const Toast = lazy(() => import("./Toast"));

export { Toast };
export { default as useToast } from "./useToast";
