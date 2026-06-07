import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";

import { completeSale } from "../../store/features/sales/salesSlice";


import { printTicket } from "../../utils/printTicket";

import POSCar from "./POSCar";
import "../Components.scss";

const POSPaymentModal = ({ open, onClose }) => {

	const dispatch = useDispatch();

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

	const handlePay = () => {

		let saleData = {
			carSaleProducts: items.map(item => ({
				id: item.id,
				name: item.name,
				price: Number(item.salePrice),
				isInBulk: item.isInBulk || false,
				weight: item.weight || 1
			})),

			totalAmount: Number(finalTotal),
			paymentMethod,
			saleStatus: "succeeded",
			dateOfSale: new Date(),

			saller: {
				id: user.id,
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

		printTicket(saleData);
		console.log("Venta realizada:", saleData);
		dispatch(completeSale());

		setCash("");
		onClose();
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