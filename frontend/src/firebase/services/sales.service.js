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
	getCountFromServer,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import Validators from "../validators";
import { serializeFirestoreData } from "../../utils/serializeFirestoreData";

const salesCollection = collection(db, "sales");

export const createSale = async (saleData) => {
    try {
        Validators.validateSale(saleData);
        const docRef = await addDoc(salesCollection, saleData);
        return { id: docRef.id, ...saleData };
    } catch (error) {
        console.error("Error creating sale:", error);
        throw error;
    }
}

export const getSales = async (filters = {}) => {
    try {
        let salesQuery = query(salesCollection);
        
        if (filters.paymentMethod) {
            salesQuery = query(salesQuery, where("paymentMethod", "==", filters.paymentMethod));
        }
        if (filters.saleStatus) {
            salesQuery = query(salesQuery, where("saleStatus", "==", filters.saleStatus));
        }
        if (filters.sallerId) {
            salesQuery = query(salesQuery, where("saller.id", "==", filters.sallerId));
        }
        if (filters.startDate && filters.endDate) {
            salesQuery = query(salesQuery, where("dateOfSale", ">=", filters.startDate), where("dateOfSale", "<=", filters.endDate));
        }

        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching sales:", error);
        throw error;
    }
}

export const getSaleById = async (id) => {
    try {
        const docRef = doc(db, "sales", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...serializeFirestoreData(docSnap.data()) };
        } else {
            throw new Error("Sale not found");
        }
    } catch (error) {
        console.error("Error fetching sale:", error);
        throw error;
    }
}

export const updateSale = async (id, updatedData) => {
    try {
        Validators.validateSale(updatedData);
        const docRef = doc(db, "sales", id);
        await updateDoc(docRef, updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error("Error updating sale:", error);
        throw error;
    }
}

export const deleteSale = async (id) => {
    try {
        const docRef = doc(db, "sales", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting sale:", error);
        throw error;
    }
}

export const countSales = async (filters = {}) => {
    try {
        let salesQuery = query(salesCollection);
        
        if (filters.paymentMethod) {
            salesQuery = query(salesQuery, where("paymentMethod", "==", filters.paymentMethod));
        }
        if (filters.saleStatus) {
            salesQuery = query(salesQuery, where("saleStatus", "==", filters.saleStatus));
        }
        if (filters.sallerId) {
            salesQuery = query(salesQuery, where("saller.id", "==", filters.sallerId));
        }
        if (filters.startDate && filters.endDate) {
            salesQuery = query(salesQuery, where("dateOfSale", ">=", filters.startDate), where("dateOfSale", "<=", filters.endDate));
        }

        const snapshot = await getCountFromServer(salesQuery);
        return snapshot.data().count;
    } catch (error) {
        console.error("Error counting sales:", error);
        throw error;
    }
}

export const getSalesToday = async () => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const salesQuery = query(salesCollection, where("dateOfSale", ">=", startOfDay), where("dateOfSale", "<", endOfDay));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching today's sales:", error);
        throw error;
    }
}

export const getSalesThisWeek = async () => {
    try {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(today.setDate(today.getDate() + 6));

        const salesQuery = query(salesCollection, where("dateOfSale", ">=", firstDayOfWeek), where("dateOfSale", "<=", lastDayOfWeek));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching this week's sales:", error);
        throw error;
    }
}

export const getSalesThisMonth = async () => {
    try {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const salesQuery = query(salesCollection, where("dateOfSale", ">=", firstDayOfMonth), where("dateOfSale", "<=", lastDayOfMonth));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching this month's sales:", error);
        throw error;
    }
}

export const getSalesThisYear = async () => {
    try {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

        const salesQuery = query(salesCollection, where("dateOfSale", ">=", firstDayOfYear), where("dateOfSale", "<=", lastDayOfYear));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching this year's sales:", error);
        throw error;
    }
}

export const getSalesByStatus = async (status) => {
    try {
        const salesQuery = query(salesCollection, where("saleStatus", "==", status));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching sales by status:", error);
        throw error;
    }
}

export const getSalesByPaymentMethod = async (paymentMethod) => {
    try {
        const salesQuery = query(salesCollection, where("paymentMethod", "==", paymentMethod));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching sales by payment method:", error);
        throw error;
    }
}

export const getSalesBySaller = async (sallerId) => {
    try {
        const salesQuery = query(salesCollection, where("saller.id", "==", sallerId));
        const querySnapshot = await getDocs(salesQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) }));
    } catch (error) {
        console.error("Error fetching sales by saller:", error);
        throw error;
    }
}
