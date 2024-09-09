export const TOAST_TIMEOUT = 3_000;

export const TOAST_ACTION_MAPPER = {
	ADD_TOAST: "ADD_TOAST",
	REMOVE_TOAST: "REMOVE_TOAST",
	CLEAR_TOASTS: "CLEAR_TOASTS",
} as const;

export type ToastState = "neutral" | "informative" | "negative" | "positive";
type ToastActionType = (typeof TOAST_ACTION_MAPPER)[keyof typeof TOAST_ACTION_MAPPER];

export interface ToastItem {
	id: string;
	action: ToastActionType;
	state: ToastState;
	message: string;
	hasClose: boolean;
}

export type ToastAddType = Pick<ToastItem, "message" | "state"> & Partial<Pick<ToastItem, "hasClose">>;

export type ToastCallbackType = (toast: Pick<ToastItem, "id" | "action"> | ToastItem) => void;
