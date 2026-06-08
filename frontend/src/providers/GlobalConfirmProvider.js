import { useRef } from "react";
import { useDispatch } from "react-redux";

import {
	showGlobalConfirm,
	hideGlobalConfirm,
} from "../store/features/ui/uiSlice";

import { GlobalConfirmContext } from "../contexts/GlobalConfirmContext";

const GlobalConfirmProvider = ({ children }) => {
	const dispatch = useDispatch();

	const resolverRef = useRef(null);

	const confirm = ({ title, message }) => {
		dispatch(
			showGlobalConfirm({
				title,
				message,
			})
		);

		return new Promise((resolve) => {
			resolverRef.current = resolve;
		});
	};

	const resolveConfirm = (value) => {
		if (resolverRef.current) {
			resolverRef.current(value);
			resolverRef.current = null;
		}

		dispatch(hideGlobalConfirm());
	};

	return (
		<GlobalConfirmContext.Provider
			value={{
				confirm,
				resolveConfirm,
			}}
		>
			{children}
		</GlobalConfirmContext.Provider>
	);
};

export default GlobalConfirmProvider;