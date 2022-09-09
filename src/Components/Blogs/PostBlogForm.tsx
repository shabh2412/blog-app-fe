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
} from "@chakra-ui/react";
import React, { ReactEventHandler, useEffect, useState } from "react";
import styles from "./PostBlogForm.module.css";
import PostBlogSection from "./PostBlogSection";
import { Remarkable } from "remarkable";
import PostBlogHTMLPreview from "./BlogPreview/PostBlogHTMLPreview";

type dataType = {
	title: string;
	body: string;
};

const initData = {
	title: "",
	body: "",
};

const PostBlogForm = () => {
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

	const md = new Remarkable();
	const [htmlPreview, setHtmlPreview] = useState<string>(
		md.render("## Dummy Blog Content")
	);

	useEffect(() => {
		if (data.body !== "") {
			setHtmlPreview(md.render(data.body));
		} else {
			setHtmlPreview(
				md.render(
					"## Dummy Blog Content\n\n- task1\n- task 2\n#### Fake Image\n![fakeImage](https://fakeimage.herokuapp.com/120x108)"
				)
			);
		}
	}, [data.body]);

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
				<PostBlogHTMLPreview content={htmlPreview} />
			</PostBlogSection>
		</Flex>
	);
};

export default PostBlogForm;
