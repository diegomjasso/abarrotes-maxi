import {
    getUserById,
    getUsers,
    loginUser,
    updateUser,
    deleteUser
} from './users.service';

export const Users = {
    getUserById,
    getUsers,
    loginUser,
    updateUser,
    deleteUser
}

const Services = {
    Users
}

export default Services;