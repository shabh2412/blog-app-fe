import { Box } from "@chakra-ui/react";
import React from "react";
import BlogList from "../Components/Blogs/BlogList";

type Props = {};

const Home = (props: Props) => {
	return (
		<Box>
			<BlogList />
		</Box>
	);
};

export default Home;
