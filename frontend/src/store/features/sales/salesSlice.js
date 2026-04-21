import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carItemsSelcted: [],
    commisionRate: 0.04,
    commissionAmount: 0,
    totalAmount: 0,
    finalTotal: 0,
    saleStatus: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed',
    paymentMethod: "cash", // 'cash' | 'card' | 'bank_transfer'
};

const calculateTotal = (items) => {
	return items.reduce((acc, item) => {

		if (item.isInBulk) {
			return acc + ((item.salePrice) * (item.weight ? item.weight : 1));
		}

		return acc + item.salePrice;

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
                existingItem.quantity += 1;
            } else {
                state.carItemsSelcted.push({ ...product, quantity: 1 });
            }

            state.totalAmount += product.salePrice;
            state.finalTotal += product.salePrice;
        },
        removeItemFromSale: (state, action) => {
            const productId = action.payload;
            const existingItemIndex = state.carItemsSelcted.findIndex(item => item.id === productId);

            if (existingItemIndex !== -1) {
                const item = state.carItemsSelcted[existingItemIndex];
                state.totalAmount -= item.salePrice * item.quantity;
                state.finalTotal -= item.salePrice * item.quantity;
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.carItemsSelcted.splice(existingItemIndex, 1);
                }
            }
        },
        updateFinalTotalAmount: (state, action) => {
            if (state.paymentMethod === 'card' && state.carItemsSelcted.length > 0) {
                state.commissionAmount = (state.totalAmount * state.commisionRate);
                state.finalTotal = calculateTotal(state.carItemsSelcted) + state.commissionAmount;
            } else {
                state.finalTotal =calculateTotal(state.carItemsSelcted);
            }
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        completeSale: (state) => {
            state.saleStatus = "succeeded";
            state.carItemsSelcted = [];
            state.totalAmount = 0;
            state.commisionRate = 0.04;
            state.commissionAmount = 0;
            state.finalTotal = 0;
        },
        updateProductSalePrice: (state, action) => {
            state.carItemsSelcted[action.payload.ind].weight = action.payload.weight;
        }
    }
});

export const { addItemToSale, removeItemFromSale, setPaymentMethod, completeSale, updateFinalTotalAmount, updateProductSalePrice } = salesSlice.actions;

export default salesSlice.reducer;
