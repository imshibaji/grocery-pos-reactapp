import { Product } from "../reducers/products";

export const uid = () => Math.random().toString(36).slice(2,9);
export const STORAGE_KEY = "grocery_pos_lean_v1";
export const DEFAULT_PRODUCTS: Product[] = [
  { id: uid(), name: "Rice (Sona Masoori) 1kg", category: "Staples", unit: "kg", cost: 40, sell: 45, stock: 50 },
  { id: uid(), name: "Wheat Atta (10kg)", category: "Staples", unit: "pack", cost: 350, sell: 380, stock: 10 },
  { id: uid(), name: "Sugar 1kg", category: "Staples", unit: "kg", cost: 42, sell: 48, stock: 50 },
  { id: uid(), name: "Toor Dal 1kg", category: "Pulses", unit: "kg", cost: 110, sell: 120, stock: 20 },
  { id: uid(), name: "Soybean Oil 1L", category: "Oils", unit: "L", cost: 120, sell: 130, stock: 30 },
  { id: uid(), name: "Parle-G (10)", category: "Snacks", unit: "pack", cost: 8.5, sell: 10, stock: 100 },
  { id: uid(), name: "Lux Soap", category: "Toiletries", unit: "pc", cost: 28, sell: 35, stock: 100 },
  { id: uid(), name: "Maggi (pack)", category: "Packaged", unit: "pack", cost: 12, sell: 14, stock: 50 },
  { id: uid(), name: "Dairy Milk (10)", category: "Snacks", unit: "pc", cost: 7.5, sell: 10, stock: 50 }
];

export function currency(n: number){ return "₹"+Number(n).toFixed(2); }

export function getProductsProvider(): Product[] {
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : DEFAULT_PRODUCTS;
    }catch(e){ return DEFAULT_PRODUCTS; }
}

export function setProductsProvider(data: Product[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addProductProvider(data: Product) {
    const products = getProductsProvider();
    setProductsProvider([...products, data]);
}

export function addProductsProvider(data: Product[]) {
    const products = getProductsProvider();
    setProductsProvider([...products, ...data]);
}

export function updateProductsProvider(data: Product[]) {
    setProductsProvider(data);
}

export function removeProductProvider(id: string) {
    const products = getProductsProvider();
    setProductsProvider(products.filter(p=>p.id!==id));
}