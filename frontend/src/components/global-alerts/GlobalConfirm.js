import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useContext } from "react";

import { GlobalConfirmContext } from "../../contexts/GlobalConfirmContext";

import "./GlobalConfirm.scss";

const GlobalConfirm = () => {
	const { resolveConfirm } = useContext(
		GlobalConfirmContext
	);

	const { open, title, message } = useSelector(
		(state) => state.ui.globalConfirmConfig
	);

	const handleCancel = () => {
		resolveConfirm(false);
	};

	const handleConfirm = () => {
		resolveConfirm(true);
	};

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			maxWidth="xs"
			fullWidth
		>
			<DialogTitle>
				{title || "Confirmar acción"}
			</DialogTitle>

			<DialogContent>
				<Typography>
					{message}
				</Typography>
			</DialogContent>

			<DialogActions sx={{ p: 2 }}>
				<Button
					onClick={handleCancel}
					variant="outlined"
				>
					Cancelar
				</Button>

				<Button
					onClick={handleConfirm}
					variant="contained"
					color="error"
				>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GlobalConfirm;