import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { hideGlobalAlert } from "../../store/features/ui/uiSlice";

import "./GlobalAlert.scss";

const GlobalAlert = () => {
	const dispatch = useDispatch();
	const { open, severity, message, defaultDuration } = useSelector(
		(state) => state.ui.globalAlertConfig
	);

	const handleClose = () => {
		dispatch(hideGlobalAlert());
	};

    const duration = severity === "error" ? 6000 : defaultDuration; // Duración más larga para errores

	return (
		<Snackbar
			open={open}
			autoHideDuration={duration}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				variant="filled"
				sx={{
					minWidth: 300,
				}}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default GlobalAlert;