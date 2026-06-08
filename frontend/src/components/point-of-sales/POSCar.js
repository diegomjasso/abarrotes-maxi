import { TextField, IconButton, CircularProgress } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";

import {
	removeItemFromSale,
	setPaymentMethod,
	updateFinalTotalAmount,
	updateProductSalePrice,
	updateCommissionRate,
	startSaleLoading,
	stopSaleLoading,
	restartStateSales,
	completeSale,
} from "../../store/features/sales/salesSlice";

import "./POSCar.scss";
import { ShoppingCart } from "lucide-react";
import { printTicket } from "../../utils/printTicket";
import { createSaleThunk } from "../../store/features/sales/salesThunk";
import { setRightSidebarContent, showGlobalAlert } from "../../store/features/ui/uiSlice";
import { useGlobalConfirm } from "../../hooks/useGlobalConfirm";
import { useLocation } from "react-router-dom";

const POSCar = ({ open, onClose }) => {
	const dispatch = useDispatch();
	const confirm = useGlobalConfirm();
	const { pathname } = useLocation();
	const user = useSelector((state) => state.auth.user);
	const items = useSelector((state) => state.sales.carItemsSelcted);
	const finalTotal = useSelector((state) => state.sales.finalTotal);
	const paymentMethod = useSelector((state) => state.sales.paymentMethod);
	const isSaleLoading = useSelector((state) => state.sales.isSaleLoading);
	const commissionAmount = useSelector(
		(state) => state.sales.commissionAmount
	);
	const commissionRate = useSelector((state) => state.sales.commissionRate);

	const [cash, setCash] = useState("");
	const [tempCommissionRate, setTempCommissionRate] = useState(
		commissionRate * 100
	); // Estado local para manejar la tasa de comisión en porcentaje

	const handleWeightChange = ({ ind, weight }) => {
		dispatch(updateProductSalePrice({ ind: ind, weight }));
		dispatch(updateFinalTotalAmount());
	};

	const change = useMemo(() => {
		const cashValue = parseFloat(cash) || 0;
		return cashValue - finalTotal;
	}, [cash, finalTotal]);

	const updateTempCommissionRate = (e) => {
		const calculatedRate = Number(e.target.value) / 100;
		setTempCommissionRate(Number(e.target.value));
		dispatch(updateCommissionRate(calculatedRate));
	};

	useEffect(() => {
		if (paymentMethod === "card") dispatch(updateFinalTotalAmount());
	}, [dispatch, paymentMethod, tempCommissionRate]);

	const handleRemove = (id) => {
		dispatch(removeItemFromSale(id));
		dispatch(updateFinalTotalAmount());
	};

	const handleRemoveAll = () => {
		const confirmed = window.confirm(
			"¿Deseas eliminar todos los productos del carrito?"
		);

		if (!confirmed) return;

		dispatch(restartStateSales());
		dispatch(updateFinalTotalAmount());
	};

	const handlePaymentSelect = (method) => {
		dispatch(setPaymentMethod(method));
		dispatch(updateFinalTotalAmount());
	};

	const title = "Carrito de Compras";

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
		<div className="pos-car">
			<div className={`pos-car-backdrop-lock ${isSaleLoading ? "active" : ""}`}>
				<CircularProgress size={24} color="inherit" className="pos-car-loading" />
			</div>

			<div className="pos-payment-modal">
				{/* HEADER */}
				<div className="header">
					<h2 className="title-cart">{title}</h2>
					{items.length > 0 && (
						<IconButton
							className="delete-icon-button"
							onClick={() => handleRemoveAll()}
						>
							<DeleteIcon className="delete-icon-icon" />
						</IconButton>
					)}
				</div>

				{/* LISTA */}
				<div className="list">
					{items.length > 0 ? (
						items.map((item, ind) => {
							const itemTotal = item.isInBulk
								? item.salePrice * (item.weight || 1)
								: item.salePrice;

							return (
								<div key={item.id} className="item-block">
									<div className="item-top">
										<div className="item-info">
											<div className="item-name-row">
												<span className="name">
													{item.name}
												</span>

												{item.isInBulk && (
													<span className="bulk-badge">
														A granel
													</span>
												)}
											</div>

											<span className="description">
												{item.description ||
													(item.isInBulk
														? "Venta por peso"
														: "Producto por pieza")}
											</span>
										</div>

										<IconButton
											className="delete-icon-button"
											onClick={() => handleRemove(item.id)}
										>
											<DeleteIcon />
										</IconButton>
									</div>

									<div className="item-middle">
										{item.isInBulk ? (
											<>
												<span>
													Precio/Kg:
													<strong>
														${item.salePrice.toFixed(2)}
													</strong>
												</span>

												<span>
													Peso:
													<strong>
														{item.weight || 0} kg
													</strong>
												</span>
											</>
										) : (
											<>
												<span>
													Precio:
													<strong>
														${item.salePrice.toFixed(2)}
													</strong>
												</span>

												<span>
													Cantidad:
													<strong>
														{item.quantity || 1}
													</strong>
												</span>
											</>
										)}
									</div>

									{item.isInBulk && (
										<div className="item-weight">
											<TextField
												size="small"
												type="number"
												label="Peso (kg)"
												inputProps={{
													step: 0.01,
													min: 0.01,
												}}
												value={item.weight || ""}
												onChange={(e) =>
													handleWeightChange({
														ind,
														weight: e.target.value,
													})
												}
											/>
										</div>
									)}

									<div className="item-bottom">
										<span>Subtotal</span>

										<strong className="price">
											$
											{itemTotal.toFixed(2) *
												(item.quantity || 1)}
										</strong>
									</div>
								</div>
							);
						})
					) : (
						<div className="empty-message">
							<span>No hay productos en el carrito</span>
						</div>
					)}
				</div>

				{/* TOTAL */}
				<div className="total">Total: ${finalTotal.toFixed(2)}</div>

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
					<div
						className={`ex-change ${cash && change < 0 ? "invalid" : "valid"}`}
					>
						<TextField
							fullWidth
							label="Pago con efectivo"
							type="number"
							value={cash}
							className="cash-input"
							onChange={(e) => setCash(e.target.value)}
						/>

						{cash && (
							<div className="ex-row">
								<span>Cambio</span>
								<span
									className={`change ${change >= 0 ? "positive" : "negative"}`}
								>
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
							<span>
								Comisión ({(commissionRate * 100).toFixed(0)}%)
							</span>
							<span>+${commissionAmount.toFixed(2)}</span>
						</div>

						<TextField
							label="% Comisión"
							type="number"
							size="small"
							value={tempCommissionRate}
							onChange={updateTempCommissionRate}
						/>
					</div>
				)}
			</div>

			<div className="pos-car-footer">
				<button onClick={() => handlePay()}
						className={`btn btn-success do-pay ${isSaleLoading ? "disabled" : ""}`}
						disabled={isSaleLoading || items.length === 0 || (paymentMethod === "cash" && change < 0)}
				>
					<span className="info-do-pay"><ShoppingCart size={22} className="icon-shopping-cart" /> Cobrar</span> <span className="total total-amount"> ${finalTotal.toFixed(2)}</span>
				</button>
			</div>
		</div>
	);
};

export default POSCar;
