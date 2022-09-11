import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBlog } from "../../redux/blogs/blogs.action";
import { RootReducer } from "../../redux/store";
import MarkdownToHTMLPreview from "./BlogPreview/MarkdownToHTMLPreview";
import styles from "./PostBlogForm.module.css";
import PostBlogSection from "./PostBlogSection";

type dataType = {
	title: string;
	body: string;
};

const initData = {
	title: "",
	body: "",
};

const PostBlogForm = () => {
	const navigate = useNavigate(); // will use this to navigate to the home page after blog is created by the user. Or in future we can use it to navigate to the newly created blog's page.
	const toast = useToast({ isClosable: true });
	const [data, setData] = useState<dataType>(initData);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.currentTarget;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const { _post } = useSelector((state: RootReducer) => state.blogs);
	const dispatch = useDispatch();

	const {
		tokens: { primaryToken },
	} = useSelector((state: RootReducer) => state.user);

	const submitBlog = () => {
		if (primaryToken) {
			if (!data.title || !data.body) {
				// alert("Title or body is empty.");
				toast({
					title: "Error!",
					status: "error",
					description: "Title or body is empty.",
				});
			} else {
				dispatch(postBlog({ data, token: primaryToken }));
			}
		} else {
			toast({
				title: "Session Expired",
				description: "Kindly login again :)",
			});
			navigate("/");
		}
	};

	useEffect(() => {
		if (_post.success) {
			toast({
				title: "Yayy! Blog posted!",
				status: "success",
			});
			navigate("/");
		}
	}, [_post.success]);

	return (
		<Flex my="20" justifyContent="center">
			<PostBlogSection sectionTitle="Create a new blog!">
				<form>
					<FormControl mb="2" className={styles.ffRoboto}>
						<FormLabel>Title</FormLabel>
						<Input
							type="text"
							name="title"
							placeholder="Enter title here"
							value={data.title}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl mb="2" className={styles.ffRoboto}>
						<FormLabel>Body</FormLabel>
						<Textarea
							rows={15}
							name={"body"}
							value={data.body}
							onChange={handleChange}
							placeholder={`You can even use MarkDown to write your blogs!
Example:
# Welcome to my first blog! 👋
							`}
						/>
					</FormControl>
					<FormControl my="4">
						<Button
							isLoading={_post.loading}
							onClick={submitBlog}
							px="10"
							py="5"
							variant="solid"
							colorScheme="twitter"
							_hover={{
								backgroundColor: "white",
								color: "#1DA1F2",
								border: "0.5px solid #043d5f",
							}}>
							Post
						</Button>
					</FormControl>
				</form>
			</PostBlogSection>
			<Box alignSelf="normal">
				<Divider orientation="vertical" />
			</Box>
			<PostBlogSection
				sectionTitle="Blog Preview"
				title={data.title || "Dummy Title"}>
				<MarkdownToHTMLPreview content={data.body} />
			</PostBlogSection>
		</Flex>
	);
};

export default PostBlogForm;
