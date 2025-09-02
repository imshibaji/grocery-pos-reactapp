import { getSettingsProvider } from "./settings";

export const SALES_STORAGE_KEY = "grocery_pos_lean_v1_sales";

// generate order id / Have some issue
export let orderId = Math.random().toString(36).slice(2,9);

export function storeSalesProvider({ products, cart }: any) {
    const settings = getSettingsProvider();  
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const totalItems = cart.length;

    const sale = cart.map((c) => {
      const p = products.find((p) => p.id === c.id);
      console.log(c);
      
      return {
        ...p,
        qty: c.qty,
        line: p!.sell * c.qty,
        date,
        time,
        orderId: orderId,
        gst: settings.gst ? (((p!.sell * c.qty) * (settings.gstPercent / 100)).toFixed(2)) : 0,
        delivary: settings.deliveryCharge ? (settings.delivery / totalItems).toFixed(2) : 0,
        profit: (p!.sell - p!.cost) * c.qty,
      };
    });

    const prev = JSON.parse(localStorage.getItem(SALES_STORAGE_KEY) || "[]");
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify([...prev, ...sale]));
    return sale;
  }

  export function getRecentSalesProviderByOrderId(id: string) {
    const sales = JSON.parse(localStorage.getItem(SALES_STORAGE_KEY) || "[]");
    return sales.filter((s: any) => s.orderId === id);
  }

  export function getSalesProvider() {
    // get sales safely
    return JSON.parse(localStorage.getItem(SALES_STORAGE_KEY) || "[]");
  }