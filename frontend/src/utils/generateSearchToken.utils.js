export const generateSearchTokens = (product) => {
	const tokens = new Set();

	const normalize = (text) =>
		text
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.trim();

	const addToken = (token) => {
		if (!token) return;
		tokens.add(token);
	};

	const fields = [
		product.name,
		product.brand,
		product.barcode,
		String(product.salePrice || "")
	];

	fields.forEach((field) => {
		if (!field) return;

		const value = normalize(field);

		// dividir palabras
		const words = value.split(/\s+/);

		words.forEach((word) => {
			if (!word) return;

			addToken(word);

			/* ========================= */
			/* NUMEROS Y UNIDADES 🔥 */
			/* ========================= */

			// detectar números tipo 2.5, 600ml, 1lt, etc
			const match = word.match(/^(\d+(\.\d+)?)([a-z]*)$/);

			if (match) {
				const number = match[1]; // 2.5
				const unit = match[3];   // lts, ml, etc

				addToken(number); // 👉 "2.5"

				if (unit) {
					addToken(`${number}${unit}`); // "2.5lts"
					addToken(`${number} ${unit}`); // "2.5 lts"
				}

				// variantes comunes
				addToken(number.replace(".", "_")); // "2_5"
			}
		});
	});

	return Array.from(tokens);
};