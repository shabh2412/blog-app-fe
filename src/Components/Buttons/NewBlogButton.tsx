import { Button } from "@chakra-ui/react";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

type Props = {};

const NewBlogButton = (props: Props) => {
	const navigate = useNavigate();
	const navigateToNewBlogPage = () => {
		navigate("/new-blog");
	};
	return (
		<Button
			variant="outline"
			colorScheme="telegram"
			onClick={navigateToNewBlogPage}>
			<HiPencilAlt />
			New Blog
		</Button>
	);
};

export default NewBlogButton;
