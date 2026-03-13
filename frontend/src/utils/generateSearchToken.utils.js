export const generateSearchTokens = (product) => {
	const tokens = new Set();

	const fields = [
		product.name,
		product.brand,
		product.barcode,
		String(product.salePrice || "")
	];

	fields.forEach((field) => {
		if (!field) return;

		const value = field.toLowerCase();

		// Prefijos progresivos
		for (let i = 1; i <= value.length; i++) {
			tokens.add(value.substring(0, i));
		}

		// También dividir por palabras
		value.split(" ").forEach(word => {
			for (let i = 1; i <= word.length; i++) {
				tokens.add(word.substring(0, i));
			}
		});
	});

	return Array.from(tokens);
};