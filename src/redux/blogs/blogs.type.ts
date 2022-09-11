import { loadingSuccessOrError } from "../user/user.reducer";
export type blogFormData = {
	title: string;
	body: string;
};
export type blogType = {
	title: string;
	body: string;
	author: string;
	date: Date;
	hidden: boolean;
};

export type BlogDataStore = {
	blogs: blogType[];
	_get: loadingSuccessOrError;
	_post: loadingSuccessOrError;
	_update: loadingSuccessOrError;
	_delete: loadingSuccessOrError;
};

export const BLOGS_GET_LOADING = "BLOGS_GET_LOADING";
export const BLOGS_GET_SUCCESS = "BLOGS_GET_SUCCESS";
export const BLOGS_GET_ERROR = "BLOGS_GET_ERROR";

export interface BlogsGetError {
	type: typeof BLOGS_GET_ERROR;
	payload: boolean;
	// try this later:  display error message instead of a boolean value.
}

export interface BlogsGetLoading {
	type: typeof BLOGS_GET_LOADING;
	payload: boolean;
}

export interface BlogsGetSuccess {
	type: typeof BLOGS_GET_SUCCESS;
	payload: blogType[];
}

export const BLOGS_POST_LOADING = "BLOGS_POST_LOADING";
export const BLOGS_POST_SUCCESS = "BLOGS_POST_SUCCESS";
export const BLOGS_POST_ERROR = "BLOGS_POST_ERROR";

export interface BlogsPostError {
	type: typeof BLOGS_POST_ERROR;
	payload: boolean;
	// try this later:  display error message instead of a boolean value.
}

export interface BlogsPostLoading {
	type: typeof BLOGS_POST_LOADING;
	payload: boolean;
}

export interface BlogsPostSuccess {
	type: typeof BLOGS_POST_SUCCESS;
	payload: boolean;
}

export type BlogsHandler =
	| BlogsGetError
	| BlogsGetLoading
	| BlogsGetSuccess
	| BlogsPostError
	| BlogsPostLoading
	| BlogsPostSuccess;
