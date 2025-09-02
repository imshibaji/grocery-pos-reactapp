import { createSlice } from "@reduxjs/toolkit";
import { addProductProvider, addProductsProvider, getProductsProvider, setProductsProvider } from "../providers/products";

export interface Product {
    id: string;
    name: string;
    category: string;
    unit: string;
    cost: number;
    sell: number;
    stock: number;
}

export const productSlice = createSlice({
    name: "products",
    initialState: getProductsProvider() as Product[],
    reducers: {
        addProducts: (state, action) => {
            if(!action.payload) return;
            if(Array.isArray(action.payload)){
                if(!action.payload.length) return;
                addProductsProvider(action.payload as Product[]);
                state.push(...action.payload);
                return;
            };
            if(typeof action.payload === "object"){
                addProductProvider(action.payload as Product);
                state.push(action.payload as Product);
                return;
            };
        },
        updateProducts: (state, action) => {            
            if(!action.payload) return;
            if(Array.isArray(action.payload)){
                if(!action.payload.length) return;
                setProductsProvider(action.payload as Product[]);
                state.splice(0, state.length, ...action.payload);
                return
            }
            if(typeof action.payload === "object"){
                setProductsProvider([action.payload as Product]);
                state.splice(0, state.length, action.payload as Product);
            };
            // return action.payload; 
        },
        removeProduct: (state, action) => {
            const index = state.findIndex((i) => i.id === action.payload);
            state.splice(index, 1);
        },
    },
});

export const { addProducts, updateProducts, removeProduct } = productSlice.actions;
export default productSlice.reducer;