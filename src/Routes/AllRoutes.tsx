import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

type Props = {};

const AllRoutes = (props: Props) => {
	return (
		<Routes>
			<Route path="/" element={<h1>Home XD</h1>} />
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
		</Routes>
	);
};

export default AllRoutes;
