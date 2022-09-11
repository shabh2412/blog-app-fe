import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/blogs/blogs.action";
import { RootReducer } from "../../redux/store";

type Props = {};

const BlogList = (props: Props) => {
	const {
		blogs,
		_get: { loading: gl, error: ge },
	} = useSelector((state: RootReducer) => state.blogs);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBlogs());
	}, []);
	return (
		<Container>
			<Text fontSize="5xl">List of blogs</Text>
			{gl && <Text>Loading data...</Text>}
			{ge && <Text>Some error occured...</Text>}
			{blogs?.map((blog) => (
				<Box
					my="2"
					border="0.5px solid black"
					px="5"
					py="5"
					borderRadius="lg"
					key={blog.title}>
					<Heading>{blog.title}</Heading>
				</Box>
			))}
		</Container>
	);
};

export default BlogList;
