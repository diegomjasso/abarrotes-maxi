export const validateSale = (sale) => {
  const errors = {};

  if (!sale.carSaleProducts || !Array.isArray(sale.carSaleProducts) || sale.carSaleProducts.length === 0) {
    errors.carSaleProducts = "La venta debe incluir al menos un producto";
  } else {
    sale.carSaleProducts.forEach((item, index) => {
      if (!item.id) {
        errors[`items[${index}].id`] = "El producto debe tener un ID";
      }
      if (typeof item.quantity !== "number" || item.quantity <= 0) {
        errors[`items[${index}].quantity`] = "La cantidad debe ser mayor a 0";
      }
      if (typeof item.price !== "number" || item.price <= 0) {
        errors[`items[${index}].price`] = "El precio debe ser mayor a 0";
      }
    });
  }

  if (!sale.totalAmount || typeof sale.totalAmount !== "number" || sale.totalAmount <= 0) {
    errors.totalAmount = "El monto total debe ser mayor a 0";
  }

  if (!sale.paymentMethod || !["cash", "card", "bank_transfer"].includes(sale.paymentMethod)) {
    errors.paymentMethod = "El método de pago es inválido";
  }

  if (sale.saleStatus && !["idle", "pending", "succeeded", "failed"].includes(sale.saleStatus)) {
    errors.saleStatus = "El estado de la venta es inválido";
  }

  if (sale.saller && typeof sale.saller !== "object") {
    errors.saller = "saller debe ser un objeto con información del vendedor";
  }

  if (sale.dateOfSale && isNaN(Date.parse(sale.dateOfSale))) {
    errors.dateOfSale = "dateOfSale debe ser una fecha válida";
  }

  if (Object.keys(errors).length > 0) {
    const error = new Error("Error de validación");
    error.validationErrors = errors;
    throw error;
  }
};
