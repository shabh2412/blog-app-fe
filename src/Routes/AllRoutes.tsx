import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogList from "../Components/Blogs/BlogList";
import BlogPage from "../Components/Blogs/BlogPage/BlogPage";
import PostBlog from "../Pages/Blogs/PostBlog";
import Home from "../Pages/Home";
import PrivateRoutes from "./PrivateRoutes";

type Props = {};

const AllRoutes = (props: Props) => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
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
			<Route path="read-blog" element={<BlogPage />} />
		</Routes>
	);
};

export default AllRoutes;
