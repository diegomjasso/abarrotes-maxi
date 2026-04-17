import {
    getUserById,
    getUsers,
    loginUser,
    updateUser,
    deleteUser
} from './users.service';

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    findByBarcode,
    searchProducts
} from './products.service';

import {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
    countSales,
    getSalesByPaymentMethod,
    getSalesByStatus,
    getSalesBySaller,
    getSalesThisMonth,
    getSalesThisYear,
    getSalesThisWeek,
    getSalesToday
} from './sales.service';

export const Users = {
    getUserById,
    getUsers,
    loginUser,
    updateUser,
    deleteUser
};

export const Products = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    findByBarcode,
    searchProducts
}

export const Sales = {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
    countSales,
    getSalesByPaymentMethod,
    getSalesByStatus,
    getSalesBySaller,
    getSalesThisMonth,
    getSalesThisYear,
    getSalesThisWeek,
    getSalesToday
}

const Services = {
    Users,
    Products,
    Sales
}

export default Services;