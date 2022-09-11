import { Badge, Box, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { blogType } from "../../redux/blogs/blogs.type";

type Props = {
	blog: blogType;
	titleColor: string;
	authorColor: string;
};

const checkIfNew = (creationDate: string): boolean => {
	// console.log(creationDate);
	const today = Date.now();
	const createdAt = Date.parse(creationDate);
	const diffTime = Math.abs(today - createdAt);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays <= 1;
};

const BlogCard = ({ blog, titleColor, authorColor }: Props) => {
	const navigate = useNavigate();
	const navigateToBlogPage = () => {
		localStorage.setItem("selectedBlog", JSON.stringify(blog));
		navigate(`read-blog`);
	};
	return (
		<Box
			onClick={() => {
				navigateToBlogPage();
			}}
			rounded="lg"
			key={blog._id}
			p="5"
			border="1px solid gray"
			cursor="pointer"
			transition="0.25s all ease-in"
			position="relative"
			_hover={{
				backdropFilter: "invert(10%)",
			}}>
			<Text
				color={titleColor}
				fontSize="x-large"
				fontWeight="bold"
				my="3"
				textDecoration="underline">
				{blog.title}
			</Text>
			{checkIfNew(blog.date.toString()) && (
				<Badge colorScheme="purple" position="absolute" top="5" right="5">
					NEW
				</Badge>
			)}
			<Text fontStyle="italic" color={authorColor}>
				by {blog.author.name}
			</Text>
		</Box>
	);
};

export default BlogCard;
