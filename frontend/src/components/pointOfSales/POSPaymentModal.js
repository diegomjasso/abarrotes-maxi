import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import {
	completeSale,
	removeItemFromSale,
	setPaymentMethod
} from "../../store/features/sales/salesSlice";

import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { createSaleThunk } from "../../store/features/sales/salesThunk";
import { printTicket } from "../../utils/printTicket";

import "../Components.scss";

const POSPaymentModal = ({ open, onClose }) => {

	const dispatch = useDispatch();

	const items = useSelector((state) => state.sales.carItemsSelcted);
	const total = useSelector((state) => state.sales.totalAmount);
	const paymentMethod = useSelector((state) => state.sales.paymentMethod);
	const user = useSelector((state) => state.auth.user);

	const [cash, setCash] = useState("");

	const change = useMemo(() => {
		const cashValue = parseFloat(cash) || 0;
		return cashValue - total;
	}, [cash, total]);

	const handlePay = () => {

		const saleData = {
			carSaleProducts: items.map(item => ({
				id: item.id,
				name: item.name,
				price: Number(item.price),
				quantity: item.quantity,
			})),
			totalAmount: Number(total),
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

		console.log("SALE DATA:", saleData);

		//dispatch(createSaleThunk(saleData)); // 🔥 GUARDAR EN FIREBASE
		printTicket(saleData); // IMPRIMIR TICKET
		dispatch(completeSale()); // limpiar carrito

		setCash("");
		onClose();
	};

	const handleRemove = (id) => {
		dispatch(removeItemFromSale(id));
	};

	const handlePaymentSelect = (method) => {
		dispatch(setPaymentMethod(method));
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

			<DialogTitle>Resumen de Venta</DialogTitle>

			<DialogContent>

				<div className="pos-payment-modal">

					{/* LISTA */}
					<div className="list">
						{items.map((item) => (
							<div key={item.id} className="item">

								<div className="info">
									<span>{item.name} x{item.quantity}</span>
									<span>${(item.price * item.quantity).toFixed(2)}</span>
								</div>

								<IconButton onClick={() => handleRemove(item.id)}>
									<DeleteIcon />
								</IconButton>

							</div>
						))}
					</div>

					{/* TOTAL */}
					<div className="total">
						Total: ${total.toFixed(2)}
					</div>

					{/* 🔥 MÉTODOS DE PAGO */}
					<div className="payment-methods">

						<button
							className={`method ${paymentMethod === "cash" ? "active" : ""}`}
							onClick={() => handlePaymentSelect("cash")}
						>
							<PaymentsIcon className="icon" />
							<span>Efectivo</span>
						</button>

						<button
							className={`method ${paymentMethod === "card" ? "active" : ""}`}
							onClick={() => handlePaymentSelect("card")}
						>
							<CreditCardIcon className="icon" />
							<span>Tarjeta</span>
						</button>

						<button
							className={`method ${paymentMethod === "bank_transfer" ? "active" : ""}`}
							onClick={() => handlePaymentSelect("bank_transfer")}
						>
							<AccountBalanceIcon className="icon" />
							<span>Transferencia</span>
						</button>

					</div>

					{/* 💵 SOLO SI ES EFECTIVO */}
					{paymentMethod === "cash" && (
						<>
							<div className="cash">
								<TextField
									fullWidth
									label="Pago con efectivo"
									type="number"
									value={cash}
									onChange={(e) => setCash(e.target.value)}
								/>
							</div>

							{cash && (
								<div className={`change ${change >= 0 ? "positive" : "negative"}`}>
									Cambio: ${change.toFixed(2)}
								</div>
							)}
						</>
					)}

				</div>

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