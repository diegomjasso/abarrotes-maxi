export const generateSearchTokens = (product) => {
	const tokens = new Set();

	const normalize = (text = "") =>
		text
			.toString()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^\w\s.]/g, " ")
			.replace(/\s+/g, " ")
			.trim();

	const addToken = (token) => {
		if (!token) return;

		const clean = token.trim();

		if (clean.length > 0) {
			tokens.add(clean);
		}
	};

	/* ========================= */
	/* CAMPOS INDEXABLES 🔥 */
	/* ========================= */

	const fields = [
		product.name,
		product.brand,
		product.barcode,
		...(product.barcodes || []),
		String(product.salePrice || ""),
		String(product.price || "")
	];

	fields.forEach((field) => {
		if (!field) return;

		const value = normalize(field);

		/* ========================= */
		/* TOKEN COMPLETO 🔥 */
		/* ========================= */

		addToken(value);

		/* ========================= */
		/* PREFIJOS DEL TEXTO COMPLETO */
		/* ========================= */

		let phrasePrefix = "";

		for (const char of value) {
			phrasePrefix += char;

			addToken(phrasePrefix);
		}

		/* ========================= */
		/* PALABRAS */
		/* ========================= */

		const words = value.split(" ");

		words.forEach((word, index) => {
			if (!word) return;

			/* palabra completa */
			addToken(word);

			/* prefijos palabra */
			let prefix = "";

			for (const char of word) {
				prefix += char;

				addToken(prefix);
			}

			/* ========================= */
			/* FRASES RESPETANDO ORDEN 🔥 */
			/* ========================= */

			let phrase = "";

			for (let i = index; i < words.length; i++) {
				phrase += `${words[i]} `;

				addToken(phrase.trim());
			}

			/* ========================= */
			/* NUMEROS Y UNIDADES 🔥 */
			/* ========================= */

			const match = word.match(/^(\d+(\.\d+)?)([a-z]*)$/);

			if (match) {
				const number = match[1];
				const unit = match[3];

				addToken(number);

				if (unit) {
					addToken(`${number}${unit}`);
					addToken(`${number} ${unit}`);

					/* prefijos unidad */
					let unitPrefix = "";

					for (const char of unit) {
						unitPrefix += char;

						addToken(`${number}${unitPrefix}`);
						addToken(`${number} ${unitPrefix}`);
					}
				}

				addToken(number.replace(".", "_"));
			}
		});
	});

	return Array.from(tokens);
};
