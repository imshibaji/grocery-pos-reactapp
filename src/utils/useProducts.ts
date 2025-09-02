import { useDispatch, useSelector } from "react-redux";
import { Product, removeProduct, updateProducts } from "../reducers/products";
import { RootState } from "../store";
import { DEFAULT_PRODUCTS, STORAGE_KEY } from "../providers/products";


export function useProducts() {
    const productsData = useSelector((state: RootState) => state.products as Product[]);
    const dispatch = useDispatch();

    if(!productsData.length) {
        dispatch(updateProducts(DEFAULT_PRODUCTS));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    }

    const addProductHandler = (data: Product) => {
        dispatch(updateProducts([...productsData, data]));
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...productsData, data]));
    };

    const productsHandler = (data: Product[]) => { 
        dispatch(updateProducts(data));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const removeProductHandler = (id: string) => {
        dispatch(removeProduct(productsData.filter(p=>p.id!==id)));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData.filter(p=>p.id!==id)));
    };

    return {
        products: productsData,
        setProducts: productsHandler,
        addProduct: addProductHandler,
        removeProduct: removeProductHandler
    };
}