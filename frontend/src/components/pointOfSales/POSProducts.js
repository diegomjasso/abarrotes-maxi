import "../Components.scss";
import POSProductsGrid from "./POSProductsGrid";
import SearchProductsInput from "../common/SearchProductsInput";
import { Box, Button, Typography } from "@mui/material";

const POSProducts = ({ search, setSearch, products, count , handlePaginationChange, paginationModel, addToCar }) => (
  <div className="pos-products">
    <SearchProductsInput search={search} setSearch={setSearch} />
    <POSProductsGrid
        products={products}
        addToCar={addToCar}
    />
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
    >

        <Button
            variant="outlined"
            disabled={paginationModel.page === 0}
            onClick={() =>
                handlePaginationChange({
                    ...paginationModel,
                    page: paginationModel.page - 1
                })
            }
        >
            Anterior
        </Button>

        <Typography variant="body2">
            Página {paginationModel.page + 1}
        </Typography>

        <Button
            variant="outlined"
            disabled={
                (paginationModel.page + 1) *
                paginationModel.pageSize >=
                count
            }
            onClick={() =>
                handlePaginationChange({
                    ...paginationModel,
                    page: paginationModel.page + 1
                })
            }
        >
            Siguiente
        </Button>

    </Box>
  </div>
);

export default POSProducts;