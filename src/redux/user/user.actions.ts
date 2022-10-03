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
import { config } from "../../config/config";

// const baseUrl = `http://localhost:8080/users`;
const serverUrl = config.prod.BASE_API_URL;
const baseUrl = `${serverUrl}/users`;

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

const loginErrorAction = (errorStatus: boolean): UserLoginError => {
	return { type: USER_LOGIN_ERROR, payload: errorStatus };
};
export const loginSuccessAction = (
	data: loginDataPayloadType
): UserLoginSuccess => {
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
			// console.log(err);
			dispatch(loginErrorAction(true));
			setTimeout(() => {
				dispatch(loginErrorAction(false));
			}, 10);
		}
		// return tokens;
	};

const userLoadedAction = (data: {
	data: UserType;
	tokens: verificationTokens;
}): UserLoadedData => {
	return { type: USER_LOADED, payload: data };
};

const generatePrimaryToken = async (refreshToken: string) => {
	const res = await axios.post<any>(`${baseUrl}/refresh`, {
		refreshToken,
	});
	console.log(res.data);
	if (!res.data.primaryToken) {
		return { status: "FAILURE" };
	} else {
		let tokens = {
			refreshToken,
			primaryToken: res.data.primaryToken,
		};
		localStorage.setItem("tokens", JSON.stringify(res.data));
		return { status: "SUCCESS", tokens };
	}
};

export const initializeUser =
	(): any => async (dispatch: Dispatch<UserHandler>) => {
		// const refreshToken =
		const initTokens: verificationTokens = JSON.parse(
			localStorage.getItem("tokens") || "{}"
		);
		interface userTypeNTokens {
			data: UserType;
			tokens: verificationTokens;
		}
		interface errorType {
			message: string;
		}
		// let responseType =
		// console.log(initTokens);
		if (initTokens.primaryToken) {
			let res = await axios.get<any>(`${baseUrl}`, {
				headers: {
					Authorization: `Bearer ${initTokens.primaryToken}`,
				},
			});
			console.log(res.data);
			if (!res.data.data) {
				let message: string = res.data.message.message;
				console.log(message);
				if (message == "jwt expired") {
					console.log(`send a refresh token`);
					let response = await generatePrimaryToken(initTokens.refreshToken);
					// console.log(response.status);
					if (response.status === "SUCCESS") {
						dispatch(initializeUser());
					} else {
						dispatch(logoutUserSuccess());
					}
				}
			} else {
				dispatch(userLoadedAction(res.data));
			}
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
