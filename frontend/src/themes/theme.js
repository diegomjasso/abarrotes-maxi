import { createTheme } from "@mui/material";
import light from "./_light";
import dark from "./_dark";

export const getTheme = (mode) => {
	return createTheme({
		palette: {
			mode: "light",
			background: {
				default: mode === "dark" ? dark.bg : light.bg,
				paper: mode === "dark" ? dark.surface : light.surface,
			},
			text: {
				primary: mode === "dark" ? dark.text : light.text,
				secondary: mode === "dark" ? dark.textSecondary : light.textSecondary,
			},
			surface: {
				main: mode === "dark" ? dark.surface : light.surface,
			},
			primary: {
				main: mode === "dark" ? dark.primary : light.primary,
				hover: mode === "dark" ? dark.primaryHover : light.primaryHover,
			},
			primaryHover: {
				main: mode === "dark" ? dark.primaryHover : light.primaryHover,
			},
			border: {
				main: mode === "dark" ? dark.border : light.border,
			},
			success: {
				main: mode === "dark" ? dark.success : light.success,
			},
			danger: {
				main: mode === "dark" ? dark.danger : light.danger,
			},
			cardShadow: {
				main: mode === "dark" ? dark.cardShadow : light.cardShadow,
			},
		},
	});
};