export const serializeFirestoreData = (doc) => {

	const data = doc.data();

	const cleanData = {};

	for (const key in data) {

		const value = data[key];

		if (value && typeof value.toDate === "function") {
			cleanData[key] = value.toDate().toISOString();
		} else {
			cleanData[key] = value;
		}
	}

	return {
		id: doc.id,
		...cleanData,
	};
};