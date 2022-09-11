import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogList from "../Components/Blogs/BlogList";
import PostBlog from "../Pages/Blogs/PostBlog";
import PrivateRoutes from "./PrivateRoutes";

type Props = {};

const AllRoutes = (props: Props) => {
	return (
		<Routes>
			<Route path="/" element={<BlogList />} />
			<Route
				path="/profile"
				element={
					<PrivateRoutes>
						<h1>This will show the user info/profile</h1>
					</PrivateRoutes>
				}
			/>
			<Route
				path="/myBlogs"
				element={
					<PrivateRoutes>
						Blogs posted by the user will be shown here. User will be able to
						edit and delete the posts as wel...
					</PrivateRoutes>
				}
			/>
			<Route
				path="new-blog"
				element={
					<PrivateRoutes>
						<PostBlog />
					</PrivateRoutes>
				}
			/>
		</Routes>
	);
};

export default AllRoutes;
