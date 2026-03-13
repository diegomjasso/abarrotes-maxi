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
	startAfter,
	getCountFromServer,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import Validators from "../validators";

const productsCollection = collection(db, "products");

/* ========================= */
/* SEARCH PRODUCTS BY PAGE */
/* ========================= */
export const getProductsPaginated = async (
	lastDoc = null,
	pageSize = 10
) => {
	let q;

	if (lastDoc) {
		q = query(
			collection(db, "products"),
			orderBy("name_lower"),
			startAfter(lastDoc),
			limit(pageSize)
		);
	} else {
		q = query(
			collection(db, "products"),
			orderBy("name_lower"),
			limit(pageSize)
		);
	}

	const snapshot = await getDocs(q);

	const products = snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));

	const lastVisible =
		snapshot.docs[snapshot.docs.length - 1];

	return { products, lastVisible };
};

export const getProductsCount = async () => {
  const coll = collection(db, "products");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

/* ========================= */
/* SEARCH PRODUCTS */
/* ========================= */
export const searchProducts = async (searchTerm) => {
	if (!searchTerm) return [];

	const term = searchTerm.toLowerCase();

	const q = query(
		productsCollection,
		where("searchTokens", "array-contains", term),
		limit(20)
	);

	const snapshot = await getDocs(q);

	return snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	}));
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
		...productData,
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
