import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import Validators from "../validators";
import {
    hashPassword,
    comparePassword,
} from "../../utils/password.utils";
import { serializeFirestoreData } from "../../utils/serializeFirestoreData";

const usersCollection = collection(db, "users");

/* ============================= */
/* CREATE USER */
/* ============================= */
export const createUser = async (userData) => {
    const errors = Validators.validateUser(userData);

    if(Object.keys(errors).length > 0) {
        const error = new Error("Error de validación");
        error.validationErrors = errors;
        throw error;
    }

    const hashedPassword = await hashPassword(userData.password);

    const docRef = await addDoc(usersCollection, {
        ...userData,
        password: hashedPassword,
        isSuperAdmin: userData.isSuperAdmin ?? false,
        createdAt: new Date(),
        lastLogin: null,
    });

    return docRef.id;
};

/* ============================= */
/* GET ALL USERS */
/* ============================= */
export const getUsers = async () => {
    const snapshot = await getDocs(usersCollection);

    return snapshot.docs.map((doc) => {
        const { password, ...safeData } = doc.data();
        return {
            id: doc.id,
            ...safeData,
        };
    });
};

/* ============================= */
/* GET USER BY ID */
/* ============================= */
export const getUserById = async (id) => {
    const userDoc = doc(db, "users", id);
    const snapshot = await getDoc(userDoc);

    if (!snapshot.exists()) {
        throw new Error("Usuario no encontrado");
    }

    const { password, ...safeData } = snapshot.data();

    return {
        id: snapshot.id,
        ...safeData,
    };
};

/* ============================= */
/* UPDATE USER */
/* ============================= */
export const updateUser = async (id, updatedData) => {
    const errors = Validators.validateUser(updatedData, true);

    if (Object.keys(errors).length > 0) {
        const error = new Error("Error de validación");
        error.validationErrors = errors;
        throw error;
    }

    if (updatedData.password) {
        updatedData.password = await hashPassword(
            updatedData.password
        );
    }

    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, updatedData);
};

/* ============================= */
/* DELETE USER */
/* ============================= */
export const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
};

/* ============================= */
/* LOGIN USER */
/* ============================= */
export const loginUser = async (
    identifier,
    password
) => {
    if (!identifier || !password) {
        throw new Error("Credenciales incompletas");
    }

    const queries = [
        query(usersCollection, where("curp", "==", identifier)),
        query(usersCollection, where("email", "==", identifier)),
        query(usersCollection, where("username", "==", identifier)),
    ];

    let userDoc = null;

    for (let q of queries) {
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            userDoc = snapshot.docs[0];
            break;
        }
    }

    if (!userDoc) {
        throw new Error("Usuario no encontrado");
    }

    const userData = userDoc.data();

    const isValidPassword = await comparePassword(
        password,
        userData.password
    );

    if (!isValidPassword) {
        throw new Error("Contraseña incorrecta");
    }

    // 🔥 Actualizar último login
    await updateDoc(doc(db, "users", userDoc.id), {
        lastLogin: new Date().toISOString(),
    });

    const { password: _, ...safeUser } = userData;

    return {
        id: userDoc.id,
        ...serializeFirestoreData(safeUser)
    };
};