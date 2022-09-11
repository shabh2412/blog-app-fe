import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UserLoginFormDataType } from "../../redux/user/user.types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../redux/store";
import { login } from "../../redux/user/user.actions";

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
	return (
		<>
			<Button colorScheme="blue" variant="solid" onClick={onOpen}>
				Login
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
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
					</ModalBody>
					<ModalFooter gap="1em" justifyContent="start">
						<Button
							variant="solid"
							colorScheme="green"
							onClick={() => {
								handleLogin(onClose);
							}}>
							Login
						</Button>
						<Button variant="outline" colorScheme="red" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Login;
