export const printTicket = (sale) => {

	const printWindow = window.open("", "_blank");

	printWindow.document.write(`
		<html>
			<head>
				<title>Ticket</title>
				<style>
					body { font-family: monospace; font-size: 12px; }
				</style>
			</head>
			<body>
				<h3 style="text-align:center;">MI TIENDA</h3>
				<hr/>

				${sale.carSaleProducts.map(item => `
					<div style="display:flex;justify-content:space-between;">
						<span>${item.name} x${item.quantity}</span>
						<span>$${(item.price * item.quantity).toFixed(2)}</span>
					</div>
				`).join("")}

				<hr/>

				<div style="display:flex;justify-content:space-between;font-weight:bold;">
					<span>Total</span>
					<span>$${sale.totalAmount.toFixed(2)}</span>
				</div>

				<p>Método: ${sale.paymentMethod}</p>
				<p>${new Date().toLocaleString()}</p>

				<p style="text-align:center;">Gracias por su compra</p>

			</body>
		</html>
	`);

	printWindow.document.close();

	// 🔥 CLAVE: esperar a que cargue
	printWindow.onload = () => {
		printWindow.focus();
		printWindow.print();

		setTimeout(() => {
			printWindow.close();
		}, 500);
	};
};