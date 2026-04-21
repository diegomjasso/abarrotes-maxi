import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../Components.scss";

const POSFooter = ({ onOpenPayment }) => {

	const total = useSelector((state) => state.sales.totalAmount);
	const finalTotal = useSelector((state) => state.sales.finalTotal);
	const items = useSelector((state) => state.sales.carItemsSelcted);

	const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<div className="pos-footer">

			{/* 🛒 LADO IZQUIERDO */}
			<div className="cart-info">

				<div className="cart-icon">
					<ShoppingCartIcon />
					{totalItems > 0 && (
						<span className="badge">
							{totalItems}
						</span>
					)}
				</div>

				<div className="cart-text">
					<span className="label">Productos</span>
					<span className="count">{totalItems}</span>
				</div>

			</div>

			{/* 💰 LADO DERECHO */}
			<div className="actions">

				<div className="total">
					${finalTotal.toFixed(2)}
				</div>

				<button
					className="button"
					onClick={onOpenPayment}
					disabled={total === 0}
				>
					Cobrar
				</button>

			</div>

		</div>
	);
};

export default POSFooter;