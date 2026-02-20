import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../store/features/ui/uiSlice";
import { loginThunk } from "../../store/features/auth/authSlice";


// Firebase
import ScreenBlocker from "../../components/ScreenBlocker";
import LoginForm from "../../components/LoginForm";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated, error, user } = useSelector(
		(state) => state.auth
	);

	const { loading: isLoading, loadingMessage } = useSelector(
		(state) => state.ui
	);

	/* ========================= */
	/* SUBMIT LOGIN */
	/* ========================= */
	const handleLogin = async (form) => {
		dispatch(
			loading.startLoading("Validando credenciales...")
		);

		await dispatch(loginThunk(form));

		dispatch(loading.stopLoading());
	};

	/* ========================= */
	/* REDIRECCIÓN AUTOMÁTICA */
	/* ========================= */
	
	useEffect(() => {
	  if (isAuthenticated) {
		if (user?.isSuperAdmin) {
		  navigate("/dashboard"); 
		  // aquí podrías mandar a /admin si quieres
		} else {
		  navigate("/dashboard");
		}
	  }
	}, [isAuthenticated, user, navigate]);

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
			>
				<LoginForm
					onSubmit={handleLogin}
					loading={isLoading}
					errorMessage={error}
				/>
			</Box>

			<ScreenBlocker
				open={isLoading}
				message={loadingMessage}
			/>
		</>
	);
}


export default Login;