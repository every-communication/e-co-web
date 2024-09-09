import { useCallback, useMemo } from "react";

import type { ToastAddType } from "./types";

import { ToastEventEmitter } from "./ToastEventEmitter";

interface ReturnUseToast {
	addToast: (toast: ToastAddType) => void;
	removeToast: (id: string) => void;
	clearToasts: () => void;
}

const useToast = (): ReturnUseToast => {
	const addToast = useCallback((toast: ToastAddType) => {
		ToastEventEmitter.getInstance().add(toast);
	}, []);

	const removeToast = useCallback((id: string) => {
		ToastEventEmitter.getInstance().remove(id);
	}, []);

	const clearToasts = useCallback(() => {
		ToastEventEmitter.getInstance().clear();
	}, []);

	return useMemo(() => ({ addToast, removeToast, clearToasts }), [addToast, clearToasts, removeToast]);
};

export default useToast;
