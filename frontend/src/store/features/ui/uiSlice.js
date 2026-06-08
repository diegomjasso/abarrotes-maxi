import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	loadingMessage: "",
	rightSidebarContent: "welcome",
	globalAlertConfig: {
		open: false,
		severity: "info",
		message: "",
		duration: 4500,
	},
	globalConfirmConfig: {
		open: false,
		title: "",
		message: "",
	},
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		startLoading: (state, action) => {
			state.loading = true;
			state.loadingMessage = action.payload || "Cargando...";
		},
		stopLoading: (state) => {
			state.loading = false;
			state.loadingMessage = "";
		},
		setRightSidebarContent: (state, action) => {
			state.rightSidebarContent = action.payload;
		},
		showGlobalAlert: (state, action) => {
			const { severity, message } = action.payload;
			state.globalAlertConfig = {
				open: true,
				severity,
				message,
				duration: severity === "error" ? 6000 : 4500,
			};
		},
		hideGlobalAlert: (state) => {
			state.globalAlertConfig.open = false;
			state.globalAlertConfig.message = "";
		},
		showGlobalConfirm: (state, action) => {
			const { title, message } = action.payload;
			state.globalConfirmConfig = {
				open: true,
				title,
				message,
			};
		},
		hideGlobalConfirm: (state) => {
			state.globalConfirmConfig.open = false;
			state.globalConfirmConfig.title = "";
			state.globalConfirmConfig.message = "";
		},
	},
});

export const {
	startLoading,
	stopLoading,
	setRightSidebarContent,
	showGlobalAlert,
	hideGlobalAlert,
	showGlobalConfirm,
	hideGlobalConfirm
} = uiSlice.actions;

export default uiSlice.reducer;
