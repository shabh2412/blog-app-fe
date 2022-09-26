export type UserType = {
	_id?: string;
	name: string;
	email: string;
	phone: string;
	role: "admin" | "user";
	password?: string;
};

export const USER_SIGN_UP_LOADING = "USER_SIGN_UP_LOADING";
export const USER_SIGN_UP_SUCCESS = "USER_SIGN_UP_SUCCESS";
export const USER_SIGN_UP_ERROR = "USER_SIGN_UP_ERROR";

export interface UserSignupLoading {
	type: typeof USER_SIGN_UP_LOADING;
	payload: boolean;
}
export interface UserSignupSuccess {
	type: typeof USER_SIGN_UP_SUCCESS;
	payload: UserType;
}
export interface UserSignupError {
	type: typeof USER_SIGN_UP_ERROR;
	payload: boolean;
}

export type UserLoginFormDataType = {
	email: string;
	password: string;
};

export type verificationTokens = {
	primaryToken: string;
	refreshToken: string;
};

export type loginDataPayloadType = {
	data: UserType;
	tokens: verificationTokens;
};

export const USER_LOGIN_LOADING = "USER_LOGIN_LOADING";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export interface UserLoginLoading {
	type: typeof USER_LOGIN_LOADING;
	payload: boolean;
}
export interface UserLoginSuccess {
	type: typeof USER_LOGIN_SUCCESS;
	payload: loginDataPayloadType;
}
export interface UserLoginError {
	type: typeof USER_LOGIN_ERROR;
	payload: boolean;
}

export const USER_LOGOUT_LOADING = "USER_LOGOUT_LOADING";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";

export interface UserLogOutLoading {
	type: typeof USER_LOGOUT_LOADING;
	payload: boolean;
}
export interface UserLogOutSuccess {
	type: typeof USER_LOGOUT_SUCCESS;
	payload: boolean;
}
export interface UserLogOutError {
	type: typeof USER_LOGOUT_ERROR;
	payload: boolean;
}

export const USER_LOADED = "USER_LOADED";
export interface UserLoadedData {
	type: typeof USER_LOADED;
	payload: { data: UserType; tokens: verificationTokens };
}

export type UserHandler =
	| UserSignupLoading
	| UserSignupError
	| UserSignupSuccess
	| UserLoginLoading
	| UserLoginError
	| UserLoginSuccess
	| UserLoadedData
	| UserLogOutLoading
	| UserLogOutError
	| UserLogOutSuccess;
