/*
 *
 * model of blog
 * single blog: title, body, author, likes, comments, date, image (will add later),
 * all blogs will be stored in an array.
 * states=> get, post, patch & delete: loading, error success
 *
 */

import {
	BlogDataStore,
	BlogsHandler,
	BLOGS_DELETE_ERROR,
	BLOGS_DELETE_LOADING,
	BLOGS_DELETE_SUCCESS,
	BLOGS_GET_ERROR,
	BLOGS_GET_LOADING,
	BLOGS_GET_SUCCESS,
	BLOGS_POST_ERROR,
	BLOGS_POST_LOADING,
	BLOGS_POST_SUCCESS,
} from "./blogs.type";

const initialData: BlogDataStore = {
	blogs: [],
	_delete: {
		error: false,
		loading: false,
		success: false,
	},
	_get: {
		error: false,
		loading: false,
		success: false,
	},
	_post: {
		error: false,
		loading: false,
		success: false,
	},
	_update: {
		error: false,
		loading: false,
		success: false,
	},
};

export const blogsReducer = (
	state: BlogDataStore = initialData,
	{ type, payload }: BlogsHandler
) => {
	switch (type) {
		case BLOGS_GET_LOADING: {
			return {
				...state,
				_get: {
					...state._get,
					loading: payload,
					error: false,
				},
				_post: {
					...state._post,
					error: false,
					loading: false,
					success: false,
				},
				_delete: {
					...state._delete,
					error: false,
					loading: false,
					success: false,
				},
				_update: {
					...state._update,
					error: false,
					loading: false,
					success: false,
				},
			};
		}
		case BLOGS_GET_ERROR: {
			return {
				...state,
				_get: {
					...state._get,
					loading: false,
					error: payload,
				},
			};
		}
		case BLOGS_GET_SUCCESS: {
			return {
				...state,
				blogs: payload,
				_get: {
					...state._get,
					loading: false,
					error: false,
				},
			};
		}
		case BLOGS_POST_LOADING: {
			return {
				...state,
				_post: {
					...state._post,
					error: false,
					loading: payload,
					success: false,
				},
			};
		}
		case BLOGS_POST_ERROR: {
			return {
				...state,
				_post: {
					...state._post,
					error: payload,
					loading: false,
					success: false,
				},
			};
		}
		case BLOGS_POST_SUCCESS: {
			return {
				...state,
				_post: {
					...state._post,
					error: false,
					loading: false,
					success: payload,
				},
			};
		}
		case BLOGS_DELETE_LOADING: {
			return {
				...state,
				_delete: {
					...state._delete,
					error: false,
					loading: payload,
					success: false,
				},
			};
		}
		case BLOGS_DELETE_SUCCESS: {
			return {
				...state,
				_delete: {
					...state._delete,
					error: false,
					loading: false,
					success: payload,
				},
			};
		}
		case BLOGS_DELETE_ERROR: {
			return {
				...state,
				_delete: {
					...state._delete,
					error: payload,
					loading: false,
					success: false,
				},
			};
		}
		default:
			return state;
	}
};
