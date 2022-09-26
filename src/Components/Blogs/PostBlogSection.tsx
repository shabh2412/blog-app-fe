import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
	sectionTitle: string;
	title?: string;
	body?: string;
	children: ReactElement;
};

const PostBlogSection = ({ sectionTitle, title = "", children }: Props) => {
	return (
		<Container>
			<Text fontSize="20" my="2" fontWeight="bold">
				{sectionTitle}
			</Text>
			<Divider />
			<Box my="4">
				<Heading>{title}</Heading>
			</Box>
			{children}
		</Container>
	);
};

export default PostBlogSection;
