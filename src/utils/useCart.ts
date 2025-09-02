import { useProducts } from "./useProducts";
import useSettings from "./useSettings";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  CartItem,
  clear,
  removeFromCart,
  setQty,
} from "../reducers/cart";

export default function useCart() {
  const { products } = useProducts();
  const { settings } = useSettings();
  const cart = useSelector((state: any) => state.cart as CartItem[]);
  const dispatch = useDispatch();

  function clearCart() {
    dispatch(clear());
  }

  function handleAddToCart(id: string) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    if (p.stock > 0 && !cart.find((x) => x.id === id && x.qty > (p.stock-1))) {
      dispatch(addToCart(id));
    }else{
      alert("Not enough stock");
    }
  }

  function handleSetQty(id: string, qty: number) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    if (p.stock > 0 && !cart.find((x) => x.id === id && x.qty > (p.stock-1)) && qty <= (p.stock)) {
      dispatch(setQty({ id, qty }));
    }else{
      alert("Not enough stock, available max "+(p.stock));
    }
  }

  function handleRemoveFromCart(id: string) {
    dispatch(removeFromCart(id));
  }

  const cartLines = cart.map((i) => {
    const p = products.find((x) => x.id === i.id);
    return {
      ...i,
      name: p ? p.name : "Unknown",
      price: p ? p.sell : 0,
      line: p ? p.sell * i.qty : 0,
    };
  });

  const subtotal = cartLines.reduce((s, l) => s + l.line, 0);
  const gstAmt = settings.gst ? subtotal * (settings.gstPercent / 100) : 0;
  const deliveryAmt = settings.deliveryCharge ? settings.delivery : 0;
  const total = subtotal + gstAmt + deliveryAmt;

  return {
    cart,
    cartLines,
    subtotal,
    gstAmt,
    total,
    addToCart: handleAddToCart,
    setQty: handleSetQty,
    removeFromCart: handleRemoveFromCart,
    clearCart,
  };
}
