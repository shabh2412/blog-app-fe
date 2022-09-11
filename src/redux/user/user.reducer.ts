import {
	UserHandler,
	UserType,
	USER_LOADED,
	USER_LOGIN_ERROR,
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_SUCCESS,
	USER_SIGN_UP_ERROR,
	USER_SIGN_UP_LOADING,
	USER_SIGN_UP_SUCCESS,
	verificationTokens,
} from "./user.types";
export type loadingSuccessOrError = {
	loading: boolean;
	success: boolean;
	error: boolean;
};

const initData: UserType = {
	name: "",
	email: "",
	phone: "",
	role: "user",
};

type UserDataStore = {
	data: UserType;
	tokens: {
		primaryToken?: string | null;
		refreshToken?: string | null;
	};
	signup: loadingSuccessOrError;
	login: loadingSuccessOrError;
	isAuth: Boolean;
};

const initState: UserDataStore = {
	data: initData,
	login: {
		success: false,
		error: false,
		loading: false,
	},
	signup: {
		success: false,
		error: false,
		loading: false,
	},
	tokens: {
		primaryToken: localStorage.getItem("primaryToken"),
		refreshToken: localStorage.getItem("refreshToken"),
	},
	isAuth: localStorage.getItem("primaryToken") !== null,
};
const userRT: string = localStorage.getItem("refreshToken") || "";

export const userReducer = (
	state: UserDataStore = initState,
	{ type, payload }: UserHandler
) => {
	switch (type) {
		case USER_SIGN_UP_LOADING: {
			return {
				...state,
				signup: {
					...state.signup,
					loading: payload,
					error: false,
					success: false,
				},
			};
		}
		case USER_SIGN_UP_ERROR: {
			return {
				...state,
				signup: {
					...state.signup,
					error: payload,
					loading: false,
					success: false,
				},
			};
		}
		case USER_SIGN_UP_SUCCESS: {
			return {
				...state,
				data: payload,
				signup: {
					...state.signup,
					success: true,
					loading: false,
					error: false,
				},
			};
		}
		case USER_LOGIN_LOADING: {
			return {
				...state,
				login: {
					...state.login,
					loading: payload,
					error: false,
					success: false,
				},
			};
		}
		case USER_LOGIN_ERROR: {
			return {
				...state,
				login: {
					...state.login,
					loading: false,
					error: payload,
					success: false,
				},
			};
		}
		case USER_LOGIN_SUCCESS: {
			const { primaryToken, refreshToken } = payload.tokens;
			localStorage.setItem("primaryToken", primaryToken);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("tokens", JSON.stringify(payload.tokens));
			return {
				...state,
				isAuth: true,
				data: payload.data,
				tokens: payload.tokens,
				login: {
					...state.login,
					loading: false,
					error: false,
					success: false,
				},
			};
		}
		case USER_LOGOUT_SUCCESS: {
			localStorage.clear();
			return {
				...initState,
				isAuth: false,
			};
		}
		case USER_LOADED: {
			const newState: UserDataStore = {
				...state,
				isAuth: true,
				data: {
					...payload.user,
				},
				tokens: payload.tokens,
			};
			return newState;
		}
		default: {
			return state;
		}
	}
};
