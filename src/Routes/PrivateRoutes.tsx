import React, { ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootReducer } from "../redux/store";

type Props = {
	children: ReactNode;
};

const PrivateRoutes = ({ children }: Props) => {
	const { isAuth } = useSelector((state: RootReducer) => state.user);
	const token = JSON.parse(localStorage.getItem("tokens") || "{}");
	return isAuth || token.primaryToken ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoutes;
