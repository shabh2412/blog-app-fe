import axios from "axios";
import { Dispatch } from "react";
import { PostCommentPayload } from "../../utils/CommentType";
import {
	BlogCommentError,
	BlogCommentLoading,
	BlogCommentSuccess,
	blogFormData,
	BlogsDeleteError,
	BlogsDeleteLoading,
	BlogsDeleteSuccess,
	BlogsGetError,
	BlogsGetLoading,
	BlogsGetSuccess,
	BlogsHandler,
	BlogsPostError,
	BlogsPostLoading,
	BlogsPostSuccess,
	BLOGS_DELETE_ERROR,
	BLOGS_DELETE_LOADING,
	BLOGS_DELETE_SUCCESS,
	BLOGS_GET_ERROR,
	BLOGS_GET_LOADING,
	BLOGS_GET_SUCCESS,
	BLOGS_POST_ERROR,
	BLOGS_POST_LOADING,
	BLOGS_POST_SUCCESS,
	blogType,
	BLOG_COMMENT_ERROR,
	BLOG_COMMENT_LOADING,
	BLOG_COMMENT_SUCCESS,
} from "./blogs.type";

const baseUrl = `http://localhost:8080/blogs/`;

const getBlogsLoadingAction = (): BlogsGetLoading => ({
	type: BLOGS_GET_LOADING,
	payload: true,
});

const getBlogsErrorAction = (): BlogsGetError => ({
	type: BLOGS_GET_ERROR,
	payload: true,
});

const getBlogsSuccessAction = (data: blogType[]): BlogsGetSuccess => ({
	type: BLOGS_GET_SUCCESS,
	payload: data,
});

export const getBlogs = (): any => async (dispatch: Dispatch<BlogsHandler>) => {
	dispatch(getBlogsLoadingAction());
	try {
		let res = await axios.get<blogType[]>(`${baseUrl}`);
		const data = res.data;
		dispatch(getBlogsSuccessAction(data));
	} catch (err) {
		dispatch(getBlogsErrorAction());
	}
};

// Delete blog Action
const deleteBlogLoadingAction = (payload: boolean): BlogsDeleteLoading => ({
	payload,
	type: BLOGS_DELETE_LOADING,
});

const deleteBlogErrorAction = (payload: boolean): BlogsDeleteError => ({
	payload,
	type: BLOGS_DELETE_ERROR,
});

const deleteBlogSuccessAction = (payload: boolean): BlogsDeleteSuccess => ({
	payload,
	type: BLOGS_DELETE_SUCCESS,
});

export const deleteBlog =
	(id: string): any =>
	async (dispatch: Dispatch<BlogsHandler>) => {
		dispatch(deleteBlogLoadingAction(true));
		try {
			await axios.delete(`${baseUrl}/${id}`);
			await dispatch(deleteBlogSuccessAction(true));
			dispatch(getBlogs());
		} catch (err) {
			dispatch(deleteBlogErrorAction(true));
		}
	};

const postBlogsLoadingAction = (payload: boolean): BlogsPostLoading => ({
	type: BLOGS_POST_LOADING,
	payload,
});

const postBlogsErrorAction = (payload: boolean): BlogsPostError => ({
	type: BLOGS_POST_ERROR,
	payload,
});

const postBlogsSuccessAction = (payload: boolean): BlogsPostSuccess => ({
	type: BLOGS_POST_SUCCESS,
	payload,
});

type postBlogParamsType = {
	data: blogFormData;
	token: string;
};
export const postBlog =
	({ data, token }: postBlogParamsType): any =>
	async (dispatch: Dispatch<BlogsHandler>) => {
		dispatch(postBlogsLoadingAction(true));
		if (!data || token.length === 0) {
			dispatch(postBlogsErrorAction(true));
			console.log("token or data is missing");
		} else {
			setTimeout(async () => {
				try {
					let res = await axios.post(`${baseUrl}/post`, data, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					console.log(res.data);
					await dispatch(postBlogsSuccessAction(true));
					dispatch(getBlogs());
				} catch (err) {
					dispatch(postBlogsErrorAction(true));
					console.log(err);
				}
			}, 3000);
		}
	};

const commentBlogErrorAction = (payload: boolean): BlogCommentError => ({
	payload,
	type: BLOG_COMMENT_ERROR,
});

const commentBlogLoadingAction = (payload: boolean): BlogCommentLoading => ({
	payload,
	type: BLOG_COMMENT_LOADING,
});

const commentBlogSuccessAction = (payload: boolean): BlogCommentSuccess => ({
	payload,
	type: BLOG_COMMENT_SUCCESS,
});

export const postComment =
	(data: PostCommentPayload, token: string): any =>
	async (dispatch: Dispatch<BlogsHandler>) => {
		dispatch(commentBlogLoadingAction(true));
		try {
			axios
				.post(`${baseUrl}/comment`, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => {
					dispatch(commentBlogSuccessAction(true));
				})
				.then(() => {
					dispatch(getBlogs());
				});
		} catch (err) {
			dispatch(commentBlogErrorAction(true));
			console.log(err);
		}
	};
