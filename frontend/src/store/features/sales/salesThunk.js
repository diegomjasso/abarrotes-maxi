import {
    Sales as SalesServices,
} from "../../../firebase/services";

import { startLoading, stopLoading } from "../ui/uiSlice";
import { setError } from "../errors/errorSlice";

/* ========================= */
/* CREATE SALE */
/* ========================= */
export const createSaleThunk = (saleData) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sale = await SalesServices.create (saleData);

		console.log("SALE CREATED:", sale);

	} catch (error) {
		dispatch(setError({
			message: error.message || "Error creando venta",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* GET SALES */
/* ========================= */
export const fetchSalesThunk = (filters) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sales = await SalesServices.getSales(filters);

		console.log("SALES:", sales);

		// 👇 luego puedes crear slice para guardar ventas

	} catch (error) {
		dispatch(setError({
			message: error.message || "Error obteniendo ventas",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* GET BY ID */
/* ========================= */
export const getSaleByIdThunk = (id) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sale = await SalesServices.getSaleById(id);

		console.log("SALE:", sale);

	} catch (error) {
		dispatch(setError({
			message: error.message || "Error obteniendo venta",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* UPDATE */
/* ========================= */
export const updateSaleThunk = (id, data) => async (dispatch) => {
	try {
		dispatch(startLoading());

		await SalesServices.updateSale(id, data);

	} catch (error) {
		dispatch(setError({
			message: error.message || "Error actualizando venta",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* DELETE */
/* ========================= */
export const deleteSaleThunk = (id) => async (dispatch) => {
	try {
		dispatch(startLoading());

		await SalesServices.deleteSale(id);

	} catch (error) {
		dispatch(setError({
			message: error.message || "Error eliminando venta",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};


/* ========================= */
/* TODAY */
/* ========================= */
export const getSalesTodayThunk = () => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sales = await SalesServices.getSalesToday();

		console.log("TODAY SALES:", sales);

	} catch (error) {
		dispatch(setError({
			message: "Error ventas hoy",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* WEEK */
/* ========================= */
export const getSalesThisWeekThunk = () => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sales = await SalesServices.getSalesThisWeek();

		console.log("WEEK SALES:", sales);

	} catch (error) {
		dispatch(setError({
			message: "Error ventas semana",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* MONTH */
/* ========================= */
export const getSalesThisMonthThunk = () => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sales = await SalesServices.getSalesThisMonth();

		console.log("MONTH SALES:", sales);

	} catch (error) {
		dispatch(setError({
			message: "Error ventas mes",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};

/* ========================= */
/* YEAR */
/* ========================= */
export const getSalesThisYearThunk = () => async (dispatch) => {
	try {
		dispatch(startLoading());

		const sales = await SalesServices.getSalesThisYear();

		console.log("YEAR SALES:", sales);

	} catch (error) {
		dispatch(setError({
			message: "Error ventas año",
			type: "error"
		}));
	} finally {
		dispatch(stopLoading());
	}
};