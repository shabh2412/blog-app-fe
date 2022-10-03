import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Text,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogType } from "../../../redux/blogs/blogs.type";
import { RootReducer } from "../../../redux/store";
import MarkdownToHTMLPreview from "../BlogPreview/MarkdownToHTMLPreview";
import styles from "./index.module.css";

type dataType = {
	title: string;
	body: string;
};

const initData = {
	title: "",
	body: "",
};

type Props = {};

const EditBlog = (props: Props) => {
	let blog: blogType = JSON.parse(localStorage.getItem("selectedBlog") || "{}");
	const toast = useToast({ isClosable: true });
  const navigate = useNavigate(); // will use this to navigate to the home page after blog is created by the user. Or in future we can use it to navigate to the newly created blog's page.
	if (!blog._id) {
		navigate("/");
		toast({
			title: "Error occured while loading the blog.",
			description: "It seems like the blog you're looking for does not exist",
			status: "error",
		});
	}
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
				// dispatch(postBlog({ data, token: primaryToken }));
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
		<Box>
			<Text textAlign="center" my="5" fontSize="x-large">
				Editing blog...
			</Text>
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
				</Container>
			</Box>
		</Box>
	);
};

export default EditBlog;
