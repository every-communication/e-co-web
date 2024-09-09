import { useMutation } from "@tanstack/react-query";

import { signInApi, signUpApi } from "@/services/auth";

/** 자체 로그인 */
export const useSignInMutation = () =>
	useMutation({
		mutationFn: signInApi,
		onSuccess: () => {},
	});

export const useSignUpMutation = () =>
	useMutation({
		mutationFn: signUpApi,
		onSuccess: () => {},
	});
