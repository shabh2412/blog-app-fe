import appLogo from "../../assets/blogAppLogo.png";
import {
	Box,
	Button,
	Flex,
	IconButton,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RootReducer } from "../../redux/store";
import { initializeUser, logoutUser } from "../../redux/user/user.actions";
import Login from "../LoginSignup/Login";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import NewBlogButton from "../Buttons/NewBlogButton";
import { pathType } from "../../utils/pathType";

const Navbar = () => {
	const bg = useColorModeValue("white", "#11151C");
	const invertFilter = useColorModeValue("", "invert(100%)");
	const { toggleColorMode, colorMode } = useColorMode();
	const {
		data: userData,
		isAuth,
		tokens,
		login: { error: _err, success, loading },
	} = useSelector((state: RootReducer) => state.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [pathBeforeLogout, setPathBeforeLogout] = useState<pathType>(
		JSON.parse(localStorage.getItem("pathBeforeLogout") || '{ "path": "/" }')
	);
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate(pathBeforeLogout.path);
	};

	useEffect(() => {
		localStorage.setItem("pathBeforeLogout", JSON.stringify(pathBeforeLogout));
	}, [pathBeforeLogout]);

	useEffect(() => {
		dispatch(initializeUser());
	}, []);
	return (
		<Flex
			position="sticky"
			bg={bg}
			top="0"
			alignItems="center"
			p="5"
			justifyContent="space-between"
			wrap={"wrap"}
			boxShadow="xl"
			className={styles.navbar}>
			<Flex
				alignItems="center"
				onClick={() => {
					navigate("/");
				}}
				_hover={{
					cursor: "pointer",
				}}>
				<Box>
					<Image filter={invertFilter} src={appLogo} maxH="30" />
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
			<Flex w={["100%", "50%"]} justifyContent="space-between">
				<Input type="text" placeholder="Search for any topic" />
				{/* Todo: Implement search functionality */}
			</Flex>
			<Flex gap="1em">
				<IconButton
					onClick={toggleColorMode}
					aria-label="toggle theme button"
					icon={colorMode === "dark" ? <RiSunFill /> : <RiMoonClearFill />}
				/>
				{isAuth ? (
					<>
						<NewBlogButton />
						<Menu>
							<MenuButton
								onClick={() => {
									setPathBeforeLogout({ path: location.pathname });
								}}>
								<Flex justifyContent="center" alignItems="center">
									<Text>{userData.name.split(" ")[0]}</Text>
									<HiChevronDown />
								</Flex>
							</MenuButton>
							<MenuList>
								<MenuItem
									onClick={() => {
										// alert("show profile on click");
										navigate("/profile");
									}}>
									Profile
								</MenuItem>
								<MenuItem
									onClick={() => {
										navigate("/myBlogs");
									}}>
									My Blogs
								</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</MenuList>
						</Menu>
					</>
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
