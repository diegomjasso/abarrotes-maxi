import { startLoading, stopLoading } from "../ui/uiSlice";
import { setError } from "../errors/errorSlice";
import { setProducts } from "./productsSlice";
import { Products } from "../../../firebase/services";
import {
	collection,
	query,
	orderBy,
	limit,
	startAfter,
	getDocs,
	where,
	startAt,
	endAt
} from "firebase/firestore";
import { db } from "../../../firebase/config/firebaseConfig";
import { setProductsPage } from "./productsSlice";

export const fetchProductsThunk = () => async (dispatch) => {
	try {
		// 🔥 Activar loading global
		dispatch(startLoading());

		const products = await Products.getProducts();

		dispatch(setProducts(products));
	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error cargando productos",
				type: "error",
			})
		);
	} finally {
		// 🔥 Desactivar loading global
		dispatch(stopLoading());
	}
};

export const createProductThunk = (data) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const result = await Products.createProduct(data);

		if (result && result.error) {
			dispatch(
				setError({
					message: result.error,
					type: "error",
				})
			);
		} else {
			dispatch(fetchProductsThunk());
		}

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error creando producto",
				type: "error",
			})
		);
	} finally {
		dispatch(stopLoading());
	}
};

export const updateProductThunk = (id, data) => async (dispatch) => {
	try {
		dispatch(startLoading());

		await Products.updateProduct(id, data);

		dispatch(fetchProductsThunk());

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error actualizando producto",
				type: "error",
			})
		);
	} finally {
		dispatch(stopLoading());
	}
};

export const deleteProductThunk = (id) => async (dispatch) => {
	try {
		dispatch(startLoading());

		await Products.deleteProduct(id);

		dispatch(fetchProductsThunk());

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error eliminando producto",
				type: "error",
			})
		);
	} finally {
		dispatch(stopLoading());
	}
};

export const findProductByBarcodeThunk = (barcode) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const product = await Products.findByBarcode(barcode);
		if (product) {
			dispatch(setProducts([product]));
		} else {
			dispatch(
				setError({
					message: "Producto no encontrado",
					type: "error",
				})
			);
		}

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error buscando producto por código de barras",
				type: "error",
			})
		);
	} finally {
		dispatch(stopLoading());
	}
};

export const searchProductsThunk = (query) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const products = await Products.searchProducts(query);
		dispatch(setProducts(products));

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error buscando productos",
				type: "error",
			})
		);
	} finally {
		dispatch(stopLoading());
	}
};

export const getProductByIdThunk = (id) => async (dispatch) => {
	try {
		dispatch(startLoading());

		const product = await Products.getProductById(id);
		if (product) {
			dispatch(setProducts([product]));
		} else {
			dispatch(
				setError({
					message: "Producto no encontrado",
					type: "error",
				})
			);
		}

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error buscando producto por ID",
				type: "error",
			})
		);
	} finally {
		dispatch(stopLoading());
	}
};

export const serializeFirestoreDoc = (doc) => {

  const data = doc.data();

  return {
    id: doc.id,
    ...data,

    createdAt: data.createdAt?.toDate()?.toISOString() || null,
    updatedAt: data.updatedAt?.toDate()?.toISOString() || null,

    createdAtTimestamp: data.createdAt?.toMillis() || null,
    updatedAtTimestamp: data.updatedAt?.toMillis() || null
  };

};

export const fetchProductsPaginatedThunk =
	({ page, pageSize }) =>
		async (dispatch, getState) => {

			dispatch(startLoading());

			try {

				const { cursors, search } = getState().products;

				let q;

				const previousCursor = cursors?.[page - 1];

				/* ========================= */
				/* SEARCH BY BARCODE */
				/* ========================= */

				if (search && /^\d+$/.test(search)) {

					q = query(
						collection(db, "products"),
						where("barcode", "==", search),
						limit(1)
					);

				}

				/* ========================= */
				/* SEARCH BY NAME / BRAND */
				/* ========================= */

				else if (search) {

					q = query(
						collection(db, "products"),
						orderBy("name_lower"),
						startAt(search.toLowerCase()),
						endAt(search.toLowerCase() + "\uf8ff"),
						limit(pageSize)
					);

				}

				/* ========================= */
				/* NORMAL PAGINATION */
				/* ========================= */

				else {

					if (page > 0 && previousCursor) {

						q = query(
							collection(db, "products"),
							orderBy("name_lower"),
							startAfter(previousCursor),
							limit(pageSize)
						);

					} else {

						q = query(
							collection(db, "products"),
							orderBy("name_lower"),
							limit(pageSize)
						);

					}

				}

				const snapshot = await getDocs(q);
				
				const products = snapshot.docs.map(serializeFirestoreDoc);
				const lastVisible = snapshot.docs[snapshot.docs.length - 1];
				const cursor = lastVisible?.data()?.name_lower || null;

				dispatch(setProductsPage({
					items: products,
					page,
					pageSize,
					cursor
				}));

			} catch (error) {
				console.error(error);
			}

			dispatch(stopLoading());

		};