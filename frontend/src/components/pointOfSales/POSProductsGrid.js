import "../Components.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const POSProductsGrid = ({ products = [], addToCar }) => {
	return (
		<div className="pos-products-grid">
			{products.map((product) => (
				<div key={product.id} className="product-card">

					{/* Imagen */}
					<div className="product-image">
						<img
							src={product.image || '/assets/img/no-product-found.png'}
							alt={product.name}
						/>
					</div>

					{/* Info */}
					<div className="product-info">
						<h4 className="product-name">
							{product.name}
						</h4>

						<div className="product-footer">
							<p className="product-price">
								${product.salePrice?.toFixed(2) || "0.00"}
							</p>

							<button
								className="cart-button"
								onClick={() => addToCar(product)}
							>
								<ShoppingCartIcon />
							</button>
						</div>
					</div>

				</div>
			))}
		</div>
	);

};

export default POSProductsGrid;