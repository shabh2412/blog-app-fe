import { useToast } from "@chakra-ui/react";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootReducer } from "../redux/store";

type Props = {
	children: ReactNode;
};

const PrivateRoutes = ({ children }: Props) => {
	const { isAuth } = useSelector((state: RootReducer) => state.user);
	const toast = useToast({ isClosable: true });
	const token = JSON.parse(localStorage.getItem("tokens") || "{}");
	useEffect(() => {
		if (!isAuth) {
			toast({
				title: "Access denied",
				description: "You need to login to access this page",
				status: "error",
			});
		}
	}, [isAuth]);
	return isAuth || token.primaryToken ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoutes;
