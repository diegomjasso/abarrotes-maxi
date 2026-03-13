export const validateProduct = (product, isUpdate = false) => {
  const errors = {};

  if (!product.name || product.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (!product.brand) {
    errors.brand = "La marca es obligatoria";
  }

  if (typeof product.price !== "number" || product.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  }

  if (
    product.salePrice !== undefined &&
    (typeof product.salePrice !== "number" ||
      product.salePrice < 0)
  ) {
    errors.salePrice = "El precio de venta es inválido";
  }

  if (product.stock && (typeof product.stock !== "number" || product.stock < 0)) {
    errors.stock = "El stock no puede ser negativo";
  }

  if (
    product.barcodes &&
    !Array.isArray(product.barcodes)
  ) {
    errors.barcodes = "barcodes debe ser un arreglo";
  }

  if (
    !product.registredBy ||
    typeof product.registredBy !== "object"
  ) {
    errors.registredBy =
      "Debe incluir información del usuario que registró";
  }

  if (
    product.isActive !== undefined &&
    typeof product.isActive !== "boolean"
  ) {
    errors.isActive = "isActive debe ser booleano";
  }

  if (Object.keys(errors).length > 0) {
    const error = new Error("Error de validación");
    error.validationErrors = error;
    errors.forEach(error => {
      console.log('errors', errors);
    });
    throw error;
  }
};