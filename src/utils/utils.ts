import { useEffect, useMemo, useState } from "react";
import { useProducts } from "./useProducts";
import useSettings from "./useSettings";
import { Product } from "../reducers/products";
import useCart from "./useCart";
import useHelpers from "./helpers";
import { setProductsProvider } from "../providers/products";

export function useUtils() {
  const { products, setProducts, addProduct } = useProducts();
  const { settings, setSettings } = useSettings();
  const { cart, addToCart, setQty, removeFromCart, cartLines, subtotal, gstAmt, total} = useCart();
  const { checkout, exportCSV, importCSV, whatsappText, openWhatsApp } = useHelpers();

  const [query, setQuery] = useState("");

  useEffect(
    () => {
      setProducts(products);
      setSettings(settings);
      setProductsProvider(products);
    },
    [products, settings]
  );

  const filtered = useMemo(
    () =>
      products.filter((p: Product) =>{
          return p.stock > 0 && p.name.toLowerCase().includes(query.toLowerCase())
        }
      ),
    [products, query]
  );

  return {
    products,
    query,
    setQuery,
    cart,
    filtered,
    addToCart,
    setQty,
    removeFromCart,
    cartLines,
    subtotal,
    gstAmt,
    total,
    checkout,
    exportCSV,
    importCSV,
    whatsappText,
    openWhatsApp,
    addProduct,
    setToCart: setQty,
  };
}
