import { useMutation } from "@tanstack/react-query";

import { oauthRegisterApi, signInApi, signUpApi } from "@/services/auth";

/** 자체 로그인 */
export const useSignInMutation = () =>
	useMutation({
		mutationFn: signInApi,
	});

/** 자체 회원가입 */
export const useSignUpMutation = () =>
	useMutation({
		mutationFn: signUpApi,
	});

/** oauth 로그인 후 추가 정보 기입 */
export const useOAuthRegisterMutation = () =>
	useMutation({
		mutationFn: oauthRegisterApi,
	});
