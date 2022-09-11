import axios from "axios";
import { Dispatch } from "react";
import {
	blogFormData,
	BlogsGetError,
	BlogsGetLoading,
	BlogsGetSuccess,
	BlogsHandler,
	BlogsPostError,
	BlogsPostLoading,
	BlogsPostSuccess,
	BLOGS_GET_ERROR,
	BLOGS_GET_LOADING,
	BLOGS_GET_SUCCESS,
	BLOGS_POST_ERROR,
	BLOGS_POST_LOADING,
	BLOGS_POST_SUCCESS,
	blogType,
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
