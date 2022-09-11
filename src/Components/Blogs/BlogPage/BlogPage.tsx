import { Box, Center, Container, Flex, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { blogType } from "../../../redux/blogs/blogs.type";
import MarkdownToHTMLPreview from "../BlogPreview/MarkdownToHTMLPreview";

type Props = {};

const BlogPage = (props: Props) => {
	// I could've done it without using local storage, but I've used it here because I wanted to practice it.
	// Other approaches to retrieve the blog data:
	// 1. store the id of the blog and then fetch it from db. However, this will add on to the cost of api call and network request, and will be slower on older devices.
	// Moreover, we've already fetched the data of the blog earlier, so, when we clicked on the blog, the data was automatically saved in our local storage.
	// So, i felt that going ahead with local storage option was better.
	// Approach #2.
	// I could've passed the blog data as a prop, but this would make this page coupled with the previous component, and might also lead to prop drilling.

	let blog: blogType = JSON.parse(localStorage.getItem("selectedBlog") || "{}");
	const navigate = useNavigate();
	const toast = useToast({ isClosable: true });
	if (!blog._id) {
		navigate("/");
		toast({
			title: "Error occured while loading the blog.",
			description: "It seems like the blog you're looking for does not exist",
			status: "error",
		});
	}

	return (
		<Box
			w="100%"
			// border="1px solid green"
		>
			<Container
				maxW="100%"
				w="85%"
				// border="1px solid red"
			>
				<Flex
					justifyContent="center"
					gap="5"
					alignItems="baseline"
					my="10"
					borderBottom="1px">
					<Text fontSize="5xl">{blog.title}</Text>
					<Text fontSize="normal">- By {blog.author.name}</Text>
				</Flex>
				<MarkdownToHTMLPreview content={blog.body} />
			</Container>
		</Box>
	);
};

export default BlogPage;
