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
} from './products.service'

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

const Services = {
    Users,
    Products
}

export default Services;