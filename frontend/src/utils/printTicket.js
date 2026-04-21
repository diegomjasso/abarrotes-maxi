export const printTicket = (sale) => {

	const printWindow = window.open("", "_blank");

	/* ========================= */
	/* NORMALIZACIÓN SEGURA */
	/* ========================= */

	const finalTotal = Number(sale.finalTotal ?? sale.totalAmount ?? 0);

	const productsHTML = (sale.carSaleProducts || []).map(item => {

		const isBulk = item.isInBulk;

		const weight = Number(item.weight) || 0;
		const price = Number(item.salePrice ?? item.price) || 0;

		const quantity = isBulk
			? `${(weight * 1000).toFixed(0)} g`
			: `x${item.quantity ?? 1}`;

		const total = isBulk
			? price * weight
			: price * (item.quantity ?? 1);

		return `
			<div style="display:flex;justify-content:space-between;">
				<span>${item.name} ${quantity}</span>
				<span>$${total.toFixed(2)}</span>
			</div>
		`;
	}).join("");

	/* ========================= */
	/* SUBTOTAL */
	/* ========================= */

	const subtotalHTML = sale.commission
		? `
			<div style="display:flex;justify-content:space-between;">
				<span>Subtotal</span>
				<span>$${(finalTotal - sale.commission.amount).toFixed(2)}</span>
			</div>
		`
		: "";

	/* ========================= */
	/* COMISIÓN */
	/* ========================= */

	const commissionHTML = sale.commission
		? `
			<div style="display:flex;justify-content:space-between;color:#ef6c00;">
				<span>Comisión (${(sale.commission.rate * 100).toFixed(0)}%)</span>
				<span>+$${Number(sale.commission.amount).toFixed(2)}</span>
			</div>
		`
		: "";

	/* ========================= */
	/* DOCUMENTO */
	/* ========================= */

	printWindow.document.write(`
		<html>
			<head>
				<title>Ticket</title>
				<style>
					body {
						font-family: monospace;
						font-size: 12px;
						padding: 10px;
					}
					.row {
						display: flex;
						justify-content: space-between;
					}
					.total {
						font-weight: bold;
						font-size: 14px;
					}
					.center {
						text-align: center;
					}
				</style>
			</head>
			<body>

				<h3 class="center">Abarrotes Maxi</h3>
				<p class="center">--------------------------</p>

				${productsHTML}

				<p class="center">--------------------------</p>

				${subtotalHTML}
				${commissionHTML}

				<p class="center">--------------------------</p>

				<div class="row total">
					<span>Total</span>
					<span>$${finalTotal.toFixed(2)}</span>
				</div>

				<p>Método: ${sale.paymentMethod}</p>
				<p>${new Date(sale.dateOfSale).toLocaleString()}</p>

				<p class="center">Gracias por su compra</p>

			</body>
		</html>
	`);

	printWindow.document.close();

	/* ========================= */
	/* PRINT */
	/* ========================= */

	printWindow.onload = () => {
		printWindow.focus();
		printWindow.print();

		setTimeout(() => {
			printWindow.close();
		}, 500);
	};
};