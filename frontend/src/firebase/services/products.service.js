import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const productsCollection = collection(db, "products");

export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createProduct = async (product) => {
  const docRef = await addDoc(productsCollection, product);
  return docRef.id;
};

export const updateProduct = async (id, updatedData) => {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, updatedData);
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
};