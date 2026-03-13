import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearError } from "../store/features/errors/errorSlice";

const GlobalError = () => {
	const dispatch = useDispatch();
	const { message, type } = useSelector(
		(state) => state.error
	);

	const handleClose = () => {
		dispatch(clearError());
	};

	return (
		<Snackbar
			open={!!message}
			autoHideDuration={4000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
		>
			<Alert
				onClose={handleClose}
				severity={type}
				variant="filled"
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default GlobalError;