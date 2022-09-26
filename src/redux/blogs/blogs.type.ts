import { CommentType } from "../../utils/CommentType";
import { loadingSuccessOrError } from "../user/user.reducer";
export type blogFormData = {
	title: string;
	body: string;
};
export type blogType = {
	_id: string;
	title: string;
	body: string;
	author: {
		_id: string;
		name: string;
	};
	date: Date;
	hidden: boolean;
	comments: CommentType[];
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

export const BLOGS_DELETE_LOADING = "BLOGS_DELETE_LOADING";
export const BLOGS_DELETE_SUCCESS = "BLOGS_DELETE_SUCCESS";
export const BLOGS_DELETE_ERROR = "BLOGS_DELETE_ERROR";

export interface BlogsDeleteError {
	type: typeof BLOGS_DELETE_ERROR;
	payload: boolean;
	// try this later:  display error message instead of a boolean value.
}

export interface BlogsDeleteLoading {
	type: typeof BLOGS_DELETE_LOADING;
	payload: boolean;
}

export interface BlogsDeleteSuccess {
	type: typeof BLOGS_DELETE_SUCCESS;
	payload: boolean;
}

export const BLOG_COMMENT_LOADING = "BLOG_COMMENT_LOADING";
export const BLOG_COMMENT_SUCCESS = "BLOG_COMMENT_SUCCESS";
export const BLOG_COMMENT_ERROR = "BLOG_COMMENT_ERROR";

export interface BlogCommentLoading {
	type: typeof BLOG_COMMENT_LOADING;
	payload: boolean;
}
export interface BlogCommentSuccess {
	type: typeof BLOG_COMMENT_SUCCESS;
	payload: boolean;
}
export interface BlogCommentError {
	type: typeof BLOG_COMMENT_ERROR;
	payload: boolean;
}

export type BlogsHandler =
	| BlogsGetError
	| BlogsGetLoading
	| BlogsGetSuccess
	| BlogsPostError
	| BlogsPostLoading
	| BlogsPostSuccess
	| BlogCommentLoading
	| BlogCommentError
	| BlogCommentSuccess
	| BlogsDeleteError
	| BlogsDeleteLoading
	| BlogsDeleteSuccess;
