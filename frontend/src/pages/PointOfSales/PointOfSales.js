import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
} from "@mui/material";
import "./PointOfSales.scss";
import POSProducts from "../../components/pointOfSales/POSProducts";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/ui/uiSlice";
import { fetchProductsFilteredThunk } from "../../store/features/products/productsThunk";
import { setProductsPage } from "../../store/features/products/productsSlice";
import POSFooter from "../../components/pointOfSales/POSFooter";
import POSPaymentModal from "../../components/pointOfSales/POSPaymentModal";

import { addItemToSale } from "../../store/features/sales/salesSlice";

//const IVA = 0.16;

const PointOfSales = () => {
	const [search, setSearch] = useState("");
  const [openPayment, setOpenPayment] = useState(false);

	const dispatch = useDispatch();

	const products = useSelector((state) => state.products.items);
	const totalProducts = useSelector((state) => state.products.total);
	const page = useSelector((state) => state.products.page);
	const pageSize = useSelector((state) => state.products.pageSize);
	//const loading = useSelector((state) => state.ui.loading);

  /* ========================= */
  /* FETCH (SOLO DATA) */
  /* ========================= */
  const refetch = useCallback(() => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(fetchProductsFilteredThunk({ search }));
      dispatch(stopLoading());
    }, 300);
    //
  }, [dispatch, search]);

  /* ========================= */
	/* FETCH ON SEARCH */
	/* ========================= */
	useEffect(() => {
		refetch();
	}, [refetch]);

	/* ========================= */
	/* DEBOUNCE SEARCH */
	/* ========================= */
	useEffect(() => {
		const delay = setTimeout(() => {
			refetch();
		}, 500);

		return () => clearTimeout(delay);
	}, [search, refetch]);

  /* ========================= */
  /* PAGINACIÓN (REDUX) */
  /* ========================= */
  const handlePaginationChange = useCallback((model) => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(setProductsPage({
        page: model.page,
        pageSize: model.pageSize,
      }));
      dispatch(stopLoading());
    }, 300);
  }, [dispatch]);

  const handleSearchChange = useCallback((value) => {
		setSearch(value);
		dispatch(setProductsPage({
			page: 0,
			pageSize,
		}));
	}, [dispatch, pageSize]);

  /* ========================= */
  /* ADD TO CART */
  /* ========================= */
  
  const handleAddToCart = (product) => {
    dispatch(addItemToSale(product));
  };

  return (
		<Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Punto de Venta
      </Typography>

      <POSProducts
        search={search}
        setSearch={handleSearchChange}
        products={products}
        count={totalProducts}
        paginationModel={{ page, pageSize }}
        handlePaginationChange={handlePaginationChange}
        addToCar={handleAddToCart}
      />

      {/* Aquí iría el carrito y el resumen de la venta */}
      <POSFooter onOpenPayment={() => setOpenPayment(true)} />

      <POSPaymentModal
        open={openPayment}
        onClose={() => setOpenPayment(false)}
      />
    </Container>
  );
};

export default PointOfSales;
