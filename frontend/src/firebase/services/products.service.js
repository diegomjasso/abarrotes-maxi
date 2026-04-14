import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
	getDoc,
	query,
	where,
	limit,
	orderBy,
	getCountFromServer,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import Validators from "../validators";
import { serializeFirestoreData } from "../../utils/serializeFirestoreData";

const productsCollection = collection(db, "products");
/************************/
/* SERVICES */
/***********************/

/* ========================= */
/* COUNT PRODUCTS */
/* ========================= */
export const getProductsCount = async () => {
  const coll = collection(db, "products");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

/* ========================= */
/* SEARCH PRODUCTS */
/* ========================= */
export const searchProducts = async (search) => {
	let q;

	if (search) {
		const normalizedSearch = search
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.trim();

		q = query(
			collection(db, "products"),
			where("searchTokens", "array-contains", normalizedSearch),
			orderBy("name_lower"),
			limit(200)
		);

		} else {

		q = query(
			collection(db, "products"),
			orderBy("name_lower"),
			limit(200)
		);
	}

	const snapshot = await getDocs(q);

	const products = snapshot.docs.map(serializeFirestoreData);

	return products;
};

/* ========================= */
/* CREATE PRODUCT */
/* ========================= */

export const createProduct = async (productData) => {
	Validators.validateProduct(productData);

	// 🔥 Validar barcode único
	const existing = await findByBarcode(productData.barcode);
	if (existing && productData.barcode && productData.barcode.length > 0) {
		throw new Error("El código de barras ya existe");
	}

	const docRef = await addDoc(productsCollection, {
		...serializeFirestoreData(productData),
		barcodes: productData.barcodes || [],
		isActive: productData.isActive ?? true,
		createdAt: new Date(),
	});

	return docRef.id;
};
/* ========================= */
/* GET ALL PRODUCTS */
/* ========================= */
export const getProducts = async () => {
	const snapshot = await getDocs(productsCollection);

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};

/* ========================= */
/* GET PRODUCT BY ID */
/* ========================= */
export const getProductById = async (id) => {
	const productDoc = doc(db, "products", id);
	const snapshot = await getDoc(productDoc);

	if (!snapshot.exists()) {
		throw new Error("Producto no encontrado");
	}

	return {
		id: snapshot.id,
		...snapshot.data(),
	};
};

/* ========================= */
/* UPDATE PRODUCT */
/* ========================= */
export const updateProduct = async (id, updatedData) => {
	Validators.validateProduct(updatedData, true);

	const productDoc = doc(db, "products", id);
	await updateDoc(productDoc, {
		...updatedData,
		updatedAt: new Date(),
	});
};

/* ========================= */
/* DELETE PRODUCT */
/* ========================= */
export const deleteProduct = async (id) => {
	const productDoc = doc(db, "products", id);
	await deleteDoc(productDoc);
};

/* ========================= */
/* FIND BY BARCODE */
/* ========================= */
export const findByBarcode = async (barcode) => {
	const q = query(
		productsCollection,
		where("barcode", "==", barcode)
	);

	const snapshot = await getDocs(q);

	if (!snapshot.empty) {
		return {
			id: snapshot.docs[0].id,
			...snapshot.docs[0].data(),
		};
	}

	// 🔥 Buscar en barcodes secundarios
	const qArray = query(
		productsCollection,
		where("barcodes", "array-contains", barcode)
	);

	const snapshotArray = await getDocs(qArray);

	if (!snapshotArray.empty) {
		return {
			id: snapshotArray.docs[0].id,
			...snapshotArray.docs[0].data(),
		};
	}

	return null;
};
