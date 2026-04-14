import { startLoading, stopLoading } from "../ui/uiSlice";
import { setError } from "../errors/errorSlice";
import { setProducts } from "./productsSlice";
import { Products } from "../../../firebase/services";

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
	}
};

export const updateProductThunk = (id, data) => async (dispatch) => {
	try {
		await Products.updateProduct(id, data);

		dispatch(fetchProductsThunk());

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error actualizando producto",
				type: "error",
			})
		);
	}
};

export const deleteProductThunk = (id) => async (dispatch) => {
	try {
		await Products.deleteProduct(id);

		dispatch(fetchProductsThunk());

	} catch (error) {
		dispatch(
			setError({
				message: error.message || "Error eliminando producto",
				type: "error",
			})
		);
	}
};

export const findProductByBarcodeThunk = (barcode) => async (dispatch) => {
	try {
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
	}
};

export const getProductByIdThunk = (id) => async (dispatch) => {
	try {
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
	}
};

export const fetchProductsFilteredThunk = ({ search }) => async (dispatch) => {
	try {
		const products = await Products.searchProducts(search);
		dispatch(setProducts(products)); // 👈 TODO se guarda aquí
    } catch (error) {
      console.error(error);
    }
};