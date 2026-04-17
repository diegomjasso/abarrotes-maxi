import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carItemsSelcted: [],
    totalAmount: 0,
    saleStatus: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed',
    paymentMethod: "cash", // 'cash' | 'card' | 'bank_transfer'
};

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        addItemToSale: (state, action) => {
            const product = action.payload;
            const existingItem = state.carItemsSelcted.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.carItemsSelcted.push({ ...product, quantity: 1 });
            }

            state.totalAmount += product.price;
        },
        removeItemFromSale: (state, action) => {
            const productId = action.payload;
            const existingItemIndex = state.carItemsSelcted.findIndex(item => item.id === productId);

            if (existingItemIndex !== -1) {
                const item = state.carItemsSelcted[existingItemIndex];
                state.totalAmount -= item.price * item.quantity;

                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.carItemsSelcted.splice(existingItemIndex, 1);
                }
            }
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        completeSale: (state) => {
            state.saleStatus = "succeeded";
            state.carItemsSelcted = [];
            state.totalAmount = 0;
        },
    }
});

export const { addItemToSale, removeItemFromSale, setPaymentMethod, completeSale } = salesSlice.actions;

export default salesSlice.reducer;
