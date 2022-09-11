import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/blogs/blogs.action";
import { blogType } from "../../redux/blogs/blogs.type";
import { RootReducer } from "../../redux/store";
import BlogCard from "./BlogCard";

type Props = {};

const BlogList = (props: Props) => {
	const {
		blogs,
		_get: { loading: gl, error: ge },
	} = useSelector((state: RootReducer) => state.blogs);

	const titleColor = useColorModeValue(
		"black",
		"var(--chakra-colors-telegram-300)"
	);

	const authorColor = useColorModeValue(
		"var(--chakra-colors-gray-600)",
		"var(--chakra-colors-gray-400)"
	);

	const [selectedBlogs, setSelectedBlogs] = useState<blogType[]>(blogs);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBlogs());
	}, []);

	useEffect(() => {
		setSelectedBlogs(blogs);
	}, [blogs]);

	return (
		<Box
			w="100%"
			// border="1px solid green"
		>
			<Container
				my="10"
				// border="1px solid red"
				w="85%"
				maxW="100%">
				<Heading textAlign="center" my="10">
					Welcome to Blog It Up!
				</Heading>
				{gl && <Text>Loading data...</Text>}
				{ge && <Text>Some error occured...</Text>}
				{/* {console.log(blogs)} */}
				<SimpleGrid columns={[1, 2, 3]} gap="5" p="3">
					{selectedBlogs?.map((blog) => (
						<BlogCard
							key={blog._id}
							blog={blog}
							titleColor={titleColor}
							authorColor={authorColor}
						/>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default BlogList;
