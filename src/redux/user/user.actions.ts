import { Dispatch } from "react";
import {
	loginDataPayloadType,
	UserHandler,
	UserLoadedData,
	UserLoginError,
	UserLoginFormDataType,
	UserLoginLoading,
	UserLoginSuccess,
	UserLogOutError,
	UserLogOutLoading,
	UserLogOutSuccess,
	UserSignupError,
	UserSignupLoading,
	UserSignupSuccess,
	UserType,
	USER_LOADED,
	USER_LOGIN_ERROR,
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_ERROR,
	USER_LOGOUT_LOADING,
	USER_LOGOUT_SUCCESS,
	USER_SIGN_UP_ERROR,
	USER_SIGN_UP_LOADING,
	USER_SIGN_UP_SUCCESS,
	verificationTokens,
} from "./user.types";
import axios from "axios";

const baseUrl = `http://localhost:8080/users`;

const signUpLoadingAction = (): UserSignupLoading => {
	return { type: USER_SIGN_UP_LOADING, payload: true };
};

const signUpErrorAction = (): UserSignupError => {
	return { type: USER_SIGN_UP_ERROR, payload: true };
};
const signUpSuccessAction = (data: UserType): UserSignupSuccess => {
	return { type: USER_SIGN_UP_SUCCESS, payload: data };
};

export const signup =
	(data: UserType) =>
	async (dispatch: Dispatch<UserHandler>): Promise<void> => {
		if (!data.password) {
			dispatch(signUpErrorAction());
		} else {
			dispatch(signUpLoadingAction());
			try {
				let res = await axios.post(`${baseUrl}/post`, data);
				dispatch(signUpSuccessAction(res.data));
			} catch (err) {
				console.log(err);
			}
		}
	};

const loginLoadingAction = (): UserLoginLoading => {
	return { type: USER_LOGIN_LOADING, payload: true };
};

const loginErrorAction = (): UserLoginError => {
	return { type: USER_LOGIN_ERROR, payload: true };
};
const loginSuccessAction = (data: loginDataPayloadType): UserLoginSuccess => {
	return { type: USER_LOGIN_SUCCESS, payload: data };
};

export const login =
	(data: UserLoginFormDataType): any =>
	async (dispatch: Dispatch<UserHandler>): Promise<void> => {
		const { email, password } = data;
		dispatch(loginLoadingAction());
		try {
			let res = await axios.post<loginDataPayloadType>(`${baseUrl}/login`, {
				email,
				password,
			});
			let { data, tokens } = res.data;
			dispatch(
				loginSuccessAction({
					data,
					tokens,
				})
			);
		} catch (err) {
			console.log(err);
			dispatch(loginErrorAction());
		}
		// return tokens;
	};

const userLoadedAction = (data: UserType): UserLoadedData => {
	return { type: USER_LOADED, payload: data };
};

export const initializeUser =
	(): any => async (dispatch: Dispatch<UserHandler>) => {
		// const refreshToken =
		const initTokens: verificationTokens = JSON.parse(
			localStorage.getItem("tokens") || "{}"
		);
		// console.log(initTokens);
		if (initTokens.refreshToken) {
			let res = await axios.get<UserType>(`${baseUrl}`, {
				headers: {
					Authorization: `Bearer ${initTokens.refreshToken}`,
				},
			});
			// console.log(res.data);
			dispatch(userLoadedAction(res.data));
		}
	};

export const logoutUserLoading = (): UserLogOutLoading => ({
	type: USER_LOGOUT_LOADING,
	payload: true,
});

export const logoutUserError = (): UserLogOutError => ({
	type: USER_LOGOUT_ERROR,
	payload: true,
});

export const logoutUserSuccess = (): UserLogOutSuccess => ({
	type: USER_LOGOUT_SUCCESS,
	payload: true,
});

export const logoutUser = (): any => (dispatch: Dispatch<UserHandler>) => {
	dispatch(logoutUserSuccess());
};
