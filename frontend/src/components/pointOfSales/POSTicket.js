import '../Components.scss';

const POSTicket = ({ sale }) => {

	return (
		<div className="ticket">

			<h3>MI TIENDA</h3>
			<p>--------------------------</p>

			{sale.carSaleProducts.map((item) => (
				<div key={item.id} className="row">
					<span>
						{item.name} x{item.quantity}
					</span>
					<span>
						${(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
			))}

			<p>--------------------------</p>

			<div className="row total">
				<span>Total</span>
				<span>${sale.totalAmount.toFixed(2)}</span>
			</div>

			<p>Método: {sale.paymentMethod}</p>
			<p>Fecha: {new Date(sale.dateOfSale).toLocaleString()}</p>

			<p>Gracias por su compra</p>

		</div>
	);
};

export default POSTicket;