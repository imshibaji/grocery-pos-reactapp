import { useDispatch, useSelector } from "react-redux";
import { Product, removeProducts, updateProducts } from "../reducers/products";
import { RootState } from "../store";
import { DEFAULT_PRODUCTS } from "../providers/products";
import { useEffect, useState } from "react";
import { ProductsService } from "../services/Products";

export function useProducts() {
  const productsData = useSelector(
    (state: RootState) => state.products as Product[]
  );
  const dispatch = useDispatch();
  const tss = new ProductsService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
        const data = await tss.fetch();
        // console.log(data);
        
        if (data && data.length > 0) {
          dispatch(updateProducts(data));
        } else {
          await tss.import(DEFAULT_PRODUCTS);
          dispatch(updateProducts(DEFAULT_PRODUCTS));
        }
      } catch (err: any) {
        console.error("Typesense Error:", err.response?.data || err.message);
      }
  };

  const addProductHandler = (data: Product) => {
    tss.create(data).catch((e) => console.log(e));
    dispatch(updateProducts([...productsData, data]));
  };

  const productsHandler = (datas: Product[]) => {
    dispatch(updateProducts(datas));
    // update
    datas.map(async (p) => await tss.update(p.id, p));
  };

  const removeProductHandler = (id: string) => {
    tss.delete(id).catch((e) => console.log(e));
    dispatch(removeProducts(id));
  };

  return {
    products: productsData,
    setProducts: productsHandler,
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
  };
}
