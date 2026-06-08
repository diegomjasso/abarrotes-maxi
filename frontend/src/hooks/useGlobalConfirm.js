import { useContext } from "react";

import { GlobalConfirmContext } from "../contexts/GlobalConfirmContext";

export const useGlobalConfirm = () => {
	const context = useContext(GlobalConfirmContext);

	if (!context) {
		throw new Error(
			"useGlobalConfirm debe usarse dentro de GlobalConfirmProvider"
		);
	}

	return context.confirm;
};