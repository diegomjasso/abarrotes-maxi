import '../Components.scss';

const POSTicket = ({ sale }) => {

	return (
		<div className="ticket">

			<h3>Abarrotes Maxi</h3>
			<p>--------------------------</p>

			{/* 🔥 LISTA DE PRODUCTOS */}
			{sale.carSaleProducts.map((item) => {

				const isBulk = item.isInBulk;

				const quantity = isBulk
					? `${(item.weight * 1000).toFixed(0)} g` // 🔥 gramos
					: `x${1}`;

				const total = isBulk
					? item.salePrice * item.weight
					: item.salePrice;

				return (
					<div key={item.id} className="row">
						<span>
							{item.name} {quantity}
						</span>

						<span>
							${total.toFixed(2)}
						</span>
					</div>
				);
			})}

			<p>--------------------------</p>

			{/* 🔥 SUBTOTAL */}
			{sale.commission && (
				<div className="row">
					<span>Subtotal</span>
					<span>
						${(sale.finalTotal - sale.commission.amount).toFixed(2)}
					</span>
				</div>
			)}

			{/* 🔥 COMISIÓN */}
			{sale.commission && (
				<div className="row commission">
					<span>
						Comisión ({(sale.commission.rate * 100).toFixed(0)}%)
					</span>
					<span>
						+${sale.commission.amount.toFixed(2)}
					</span>
				</div>
			)}

			<p>--------------------------</p>

			{/* 🔥 TOTAL FINAL */}
			<div className="row total">
				<span>Total</span>
				<span>${sale.finalTotal.toFixed(2)}</span>
			</div>

			<p>Método: {sale.paymentMethod}</p>
			<p>Fecha: {new Date(sale.dateOfSale).toLocaleString()}</p>

			<p>Gracias por su compra</p>

		</div>
	);
};

export default POSTicket;