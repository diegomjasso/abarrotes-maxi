import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carItemsSelcted: [],
    commissionRate: 0.04,
    commissionAmount: 0,
    totalAmount: 0,
    finalTotal: 0,
    saleStatus: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed',
    paymentMethod: "cash", // 'cash' | 'card' | 'bank_transfer',
    isSaleLoading: false,
};

const calculateTotal = (items) => {
    return items.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        const weight = item.weight || 1;

        // For bulk products use weight * quantity
        if (item.isInBulk) {
            return acc + (item.salePrice * weight * quantity);
        }

        // Regular products use quantity only
        return acc + (item.salePrice * quantity);

    }, 0);
};

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        addItemToSale: (state, action) => {
            const product = action.payload;
            const existingItem = state.carItemsSelcted.find(item => item.id === product.id);

            if (existingItem) {
                if (product.isInBulk) {
                    existingItem.weight = (existingItem.weight || 1) + (product.weight || 1);
                } else {
                    existingItem.quantity += 1;
                }
            } else {
                state.carItemsSelcted.push({ ...product, quantity: 1 });
            }

            state.totalAmount += (product.salePrice * (product.isInBulk ? (product.weight || 1) : 1));
            state.finalTotal += product.salePrice * (product.isInBulk ? (product.weight || 1) : 1);
        },
        removeItemFromSale: (state, action) => {
            const productId = action.payload;
            const existingItemIndex = state.carItemsSelcted.findIndex(item => item.id === productId);

            if (existingItemIndex !== -1) {
                const item = state.carItemsSelcted[existingItemIndex];
                state.totalAmount -= item.salePrice * (item.isInBulk ? (item.weight || 1) : item.quantity);
                state.finalTotal -= item.salePrice * (item.isInBulk ? (item.weight || 1) : item.quantity);
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.carItemsSelcted.splice(existingItemIndex, 1);
                }
            }
        },
        updateFinalTotalAmount: (state, action) => {
            if (state.paymentMethod === 'card' && state.carItemsSelcted.length > 0) {
                state.commissionAmount = (calculateTotal(state.carItemsSelcted) * state.commissionRate);
                state.finalTotal = calculateTotal(state.carItemsSelcted) + state.commissionAmount;
            } else {
                state.finalTotal = calculateTotal(state.carItemsSelcted);
            }
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        completeSale: (state) => {
            state.saleStatus = "succeeded";
            state.carItemsSelcted = [];
            state.totalAmount = 0;
            state.commissionRate = 0.04;
            state.commissionAmount = 0;
            state.finalTotal = 0;
        },
        updateProductSalePrice: (state, action) => {
            state.carItemsSelcted[action.payload.ind].weight = action.payload.weight;
        },
        updateCommissionRate: (state, action) => {
            state.commissionRate = action.payload;
        },
        startSaleLoading: (state) => {
            state.isSaleLoading = true;
        },
        stopSaleLoading: (state) => {
            state.isSaleLoading = false;
        },
        restartStateSales: () => initialState,
    }
});

export const {
    addItemToSale,
    removeItemFromSale,
    setPaymentMethod,
    completeSale,
    updateFinalTotalAmount,
    updateProductSalePrice,
    updateCommissionRate,
    startSaleLoading,
    stopSaleLoading,
    restartStateSales
} = salesSlice.actions;

export default salesSlice.reducer;
