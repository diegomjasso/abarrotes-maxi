const Products = {
  name: String,
  brand: String,
  price: Number,
  salePrice: Number,
  stock: Number,
  barcode: Number,
  barcodes: Array,
  registredBy: Object,   // desde Redux
  isActive: Boolean
}

export default Products