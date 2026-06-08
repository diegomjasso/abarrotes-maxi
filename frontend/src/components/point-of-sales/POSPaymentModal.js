import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";

import { completeSale, startSaleLoading, stopSaleLoading } from "../../store/features/sales/salesSlice";


import { printTicket } from "../../utils/printTicket";

import POSCar from "./POSCar";
import "../Components.scss";
import { createSaleThunk } from "../../store/features/sales/salesThunk";
import { setRightSidebarContent, showGlobalAlert } from "../../store/features/ui/uiSlice";
import { useGlobalConfirm } from "../../hooks/useGlobalConfirm";
import { useLocation } from "react-router-dom";

const POSPaymentModal = ({ open, onClose }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const confirm = useGlobalConfirm();

	const items = useSelector((state) => state.sales.carItemsSelcted);
	const finalTotal = useSelector((state) => state.sales.finalTotal);
	const paymentMethod = useSelector((state) => state.sales.paymentMethod);
	const user = useSelector((state) => state.auth.user);
	const commissionAmount = useSelector((state) => state.sales.commissionAmount);
	const commissionRate = useSelector((state) => state.sales.commissionRate);

	const [cash, setCash] = useState("");
	const change = useMemo(() => {
		const cashValue = parseFloat(cash) || 0;
		return cashValue - finalTotal;
	}, [cash, finalTotal]);

	const handlePay = async () => {
		dispatch(startSaleLoading());
		try {
			let carSaleProducts = items.map(item => ({
				id: item.id,
				name: item.name,
				price: Number(item.salePrice),
				isInBulk: item.isInBulk || false,
				quantity: item.isInBulk ? 1 : (item.quantity || 1), // Para productos a granel, la cantidad se maneja como 1, y el peso se envía por separado
				weight: item.isInBulk ? (item.weight || 0) : null // Solo enviamos el peso para productos a granel
			}));
		
			let saleData = {
				carSaleProducts,
				totalAmount: Number(finalTotal),
				paymentMethod,
				saleStatus: "succeeded",
				dateOfSale: new Date(),
				seller: {
					name: user.name,
					lastname: user.lastname,
					email: user.email
				}
			};

			if (paymentMethod === "card") {
				saleData.commission = {
					amount: commissionAmount,
					rate: commissionRate
				};
			}

			dispatch(completeSale());
			await createSaleThunk(saleData)(dispatch);
			await dispatch(showGlobalAlert({
				title: "Venta realizada",
				severity: "success",
				message: "La venta se ha procesado correctamente."
			}));

			const printConfirmed = await confirm({
				title: "¿Deseas imprimir el ticket?",
				message: "¿Quieres imprimir el ticket de esta venta?"
			});

			if (printConfirmed) {
				printTicket(saleData);
			}

			setCash("");
			onClose();
			if (pathname !== "/point-of-sales") {
				dispatch(setRightSidebarContent("welcome"));
			}
		} catch (error) {
			console.error("Error al procesar el pago:", error);
			dispatch(showGlobalAlert({
				title: "Error",
				severity: "error",
				message: "Ocurrió un error al procesar el pago. Por favor, intenta nuevamente."
			}));
		} finally {
			dispatch(stopSaleLoading());
		}
	};

	return (
		<Dialog className="pos-payment-modal-dialog" open={open} onClose={onClose} fullWidth maxWidth="sm">

			<DialogTitle>Resumen de Venta</DialogTitle>

			<DialogContent>
				<POSCar open={open} onClose={onClose} />
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>

				<Button
					variant="contained"
					color="success"
					onClick={handlePay}
					disabled={
						items.length === 0 ||
						(paymentMethod === "cash" && change < 0)
					}
				>
					Pagar
				</Button>
			</DialogActions>

		</Dialog>
	);
};

export default POSPaymentModal;