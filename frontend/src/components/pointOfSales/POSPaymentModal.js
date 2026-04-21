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
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";

import {
	completeSale,
	removeItemFromSale,
	setPaymentMethod,
	updateFinalTotalAmount,
	updateProductSalePrice
} from "../../store/features/sales/salesSlice";

import { printTicket } from "../../utils/printTicket";

import "../Components.scss";

const POSPaymentModal = ({ open, onClose }) => {

	const dispatch = useDispatch();

	const items = useSelector((state) => state.sales.carItemsSelcted);
	const total = useSelector((state) => state.sales.totalAmount);
	const finalTotal = useSelector((state) => state.sales.finalTotal);
	const paymentMethod = useSelector((state) => state.sales.paymentMethod);
	const user = useSelector((state) => state.auth.user);

	const [cash, setCash] = useState("");
	const [commissionRate, setCommissionRate] = useState(0.04);

	const handleWeightChange = ({ ind, weight }) => {
		dispatch(updateProductSalePrice({ind: ind, weight }));
		dispatch(updateFinalTotalAmount());
	};

	const change = useMemo(() => {
		const cashValue = parseFloat(cash) || 0;
		return cashValue - finalTotal;
	}, [cash, finalTotal]);

	const commissionAmount = useMemo(() => {
		if (paymentMethod !== "card") return 0;
		return total * commissionRate;
	}, [total, commissionRate, paymentMethod]);

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

		dispatch(completeSale());

		setCash("");
		onClose();
	};

	const handleRemove = (id) => {
		dispatch(removeItemFromSale(id));
	};

	const handlePaymentSelect = (method) => {
		dispatch(setPaymentMethod(method));
		dispatch(updateFinalTotalAmount());
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

			<DialogTitle>Resumen de Venta</DialogTitle>

			<DialogContent>

				<div className="pos-payment-modal">

					{/* LISTA */}
					<div className="list">
						{
							items.map((item, ind) => {

							const itemTotal = item.isInBulk
								? (item.salePrice * (item.weight || 1))
								: item.salePrice;

							return (
								<div key={item.id} className="item-block">

									{/* 🔥 ROW 1 */}
									<div className="item-header">
										<span className="name">
											{item.name}
											{!item.isInBulk && ` x${item.weight}`}
										</span>

										<span className="price">
											${itemTotal.toFixed(2)}
										</span>
									</div>

									{/* 🔥 ROW 2 SOLO BULK */}
									{item.isInBulk && (
										<div className="item-weight">
											<TextField
												size="small"
												type="number"
												label="Peso (kg)"
												inputProps={{ step: 0.01, min: 0.01 }}
												value={item.weight || ""}
												onChange={(e, i = ind) =>
													handleWeightChange({
														ind: ind,
														weight: e.target.value
													})
												}
											/>
										</div>
									)}

									{/* DELETE */}
									<div className="item-actions">
										<IconButton onClick={() => handleRemove(item.id)}>
											<DeleteIcon />
										</IconButton>
									</div>

								</div>
							);
						})}
					</div>

					{/* TOTAL */}
					<div className="total">
						Total: ${finalTotal.toFixed(2)}
					</div>

					{/* MÉTODOS */}
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

					{/* EFECTIVO */}
					{paymentMethod === "cash" && (
						<div className={`ex-change ${cash && change < 0 ? "invalid" : "valid"}`}>
							
							<TextField
								fullWidth
								label="Pago con efectivo"
								type="number"
								value={cash}
								onChange={(e) => setCash(e.target.value)}
							/>

							{cash && (
								<div className="ex-row">
									<span>Cambio</span>
									<span className={`change ${change >= 0 ? "positive" : "negative"}`}>
										${change.toFixed(2)}
									</span>
								</div>
							)}
						</div>
					)}

					{/* TARJETA */}
					{paymentMethod === "card" && (
						<div className="commission">
							<div className="commission-row">
								<span>Comisión ({(commissionRate * 100).toFixed(0)}%)</span>
								<span>+${commissionAmount.toFixed(2)}</span>
							</div>

							<TextField
								label="% Comisión"
								type="number"
								size="small"
								value={(commissionRate * 100)}
								onChange={(e) =>
									setCommissionRate(Number(e.target.value) / 100)
								}
							/>
						</div>
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