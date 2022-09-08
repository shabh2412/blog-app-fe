import {
	Box,
	Button,
	Flex,
	FormControl,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import { useEffect, useState } from "react";
import { RootReducer } from "../../redux/store";
import { initializeUser, logoutUser } from "../../redux/user/user.actions";
import Login from "../LoginSignup/Login";
import styles from "./Navbar.module.css";

const Navbar = () => {
	const {
		data: userData,
		tokens,
		login: { error: _err, success, loading },
	} = useSelector((state: RootReducer) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	useEffect(() => {
		dispatch(initializeUser());
	}, []);
	return (
		<Flex
			position="sticky"
			top="0"
			alignItems="center"
			p="3"
			justifyContent="space-between"
			wrap={"wrap"}
			className={styles.navbar}>
			<Flex alignItems="center">
				<Box>
					<Image src="./blogAppLogo.png" maxH="30" />
				</Box>
				<Text
					fontSize="24"
					style={{
						fontWeight: "bold",
						letterSpacing: "1.25px",
					}}>
					BlogItUp!
				</Text>
			</Flex>
			<Box w={["100%", "50%"]}>
				<Input type="text" placeholder="Search for any topic" />
				{/* Todo: Implement search functionality */}
			</Box>
			<Flex gap="1em">
				{userData.email ? (
					<Menu>
						<MenuButton>
							<Flex justifyContent="center" alignItems="center">
								<Text>{userData.name.split(" ")[0]}</Text>
								<HiChevronDown />
							</Flex>
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={() => {
									alert("show profile on click");
								}}>
								Profile
							</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<>
						<Login />
						<Button variant="outline" colorScheme="blue">
							Register
						</Button>
					</>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
