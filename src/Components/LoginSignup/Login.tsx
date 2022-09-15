import {
	Box,
	Button,
	Center,
	CircularProgress,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
	loginDataPayloadType,
	UserLoginFormDataType,
} from "../../redux/user/user.types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../redux/store";
import { login, loginSuccessAction } from "../../redux/user/user.actions";
import { AiOutlineGithub } from "react-icons/ai";
import {
	Navigate,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { pathType } from "../../utils/pathType";

type Props = {};

const initData: UserLoginFormDataType = {
	email: "",
	password: "",
};

const Login = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [data, setData] = useState<UserLoginFormDataType>(initData);
	const dispatch = useDispatch();
	const {
		data: userData,
		tokens,
		login: { error: _err, success, loading },
	} = useSelector((state: RootReducer) => state.user);
	// const {}

	const navigate = useNavigate();

	const pathBeforeLogin: pathType = JSON.parse(
		localStorage.getItem("pathBeforeLogin") || '{ "path": "/" }'
	);

	const location = useLocation();

	const handleChange = (name: string, value: string) => {
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleLogin = async (next: () => void) => {
		// dummy login handler.
		if (data.email && data.password) {
			// console.log("loggedin :)");
			dispatch(login(data));
		} else {
			console.log("oops");
		}
		next();
	};
	const handleCloseModal = () => {
		if (code !== null) {
			setCode(null);
			setSearchParams("");
			navigate(pathBeforeLogin.path);
		}
		onClose();
	};

	const handleOpen = () => {
		localStorage.setItem(
			"pathBeforeLogin",
			JSON.stringify({
				path: location.pathname,
			})
		);
		onOpen();
	};

	const [searchParams, setSearchParams] = useSearchParams();
	const [code, setCode] = useState<string | null>(searchParams.get("code"));
	const fetchUserData = async () => {
		console.log("fetching data");
		try {
			let res = await axios.post(
				"http://localhost:8080/users/login/github",
				null,
				{
					params: {
						code,
					},
				}
			);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};
	const toast = useToast({ isClosable: true });
	useEffect(() => {
		if (success) navigate(pathBeforeLogin.path);
	}, [success]);
	useEffect(() => {
		if (code !== null) {
			onOpen();
			console.log(code);
			fetchUserData()
				.then((res: loginDataPayloadType) => {
					if (res.tokens && res.data) {
						dispatch(loginSuccessAction(res));
						toast({
							title: "Logged in Successfully!",
							description: "Welcome to BlogItUp!",
							status: "success",
						});
					}
				})
				.catch((err: any) => {
					console.log(err);
					toast({
						title: "Some error occured!",
						description: "Try logging in again!",
						status: "error",
					});
				})
				.finally(() => {
					handleCloseModal();
				});
		}
	}, [code]);
	return (
		<>
			<Button colorScheme="blue" variant="solid" onClick={handleOpen}>
				Login
			</Button>
			<Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{code !== null ? (
							<Box display="flex" gap="3" alignItems="center">
								<Icon as={AiOutlineGithub} w={8} h={8} />
								Signing in via GitHub
								<CircularProgress isIndeterminate color="black" size="6" />
							</Box>
						) : (
							<Box>
								<FormControl>
									<FormLabel>Email</FormLabel>
									<Input
										type="email"
										autoComplete="on"
										name="email"
										value={data.email}
										onChange={(e) => {
											const { name, value } = e.currentTarget;
											handleChange(name, value);
										}}
									/>
									{/* TODO: add autocomplete later... */}
								</FormControl>
								<FormControl>
									<FormLabel>Password</FormLabel>
									<Input
										type="password"
										name="password"
										value={data.password}
										onChange={(e) => {
											const { name, value } = e.currentTarget;
											handleChange(name, value);
										}}
									/>
								</FormControl>
								<Flex my="3" gap="3">
									<Button
										variant="solid"
										colorScheme="green"
										onClick={() => {
											handleLogin(onClose);
										}}>
										Login
									</Button>
									<Button
										variant="outline"
										colorScheme="red"
										onClick={handleCloseModal}>
										Cancel
									</Button>
								</Flex>

								<Center my="5">
									<Text>Or</Text>
								</Center>
								<Flex
									justifyContent="center"
									onClick={() => {
										localStorage.setItem(
											"pathBeforeLogin",
											JSON.stringify({
												path: location.pathname,
											})
										);
									}}>
									<Link
										href="https://github.com/login/oauth/authorize?client_id=c6c281322a00b7b88b67"
										display="flex"
										gap="3">
										<Icon as={AiOutlineGithub} w={8} h={8} />
										Sign in via GitHub
									</Link>
								</Flex>
							</Box>
						)}
					</ModalBody>
					<ModalFooter gap="1em" justifyContent="start"></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Login;
