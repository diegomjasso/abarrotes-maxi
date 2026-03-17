export const serializeFirestoreData = (data) => {
    const result = {};

    for (let key in data) {
        const value = data[key];

        if (value && typeof value.toDate === "function") {
            result[key] = value.toDate().toISOString();
        } else {
            result[key] = value;
        }
    }

    return result;
};