import { uid } from "../providers/products";
import { getSalesProvider, storeSalesProvider } from "../providers/sales";
import useCart from "./useCart";
import { useProducts } from "./useProducts";
import useSettings from "./useSettings";



export default function useHelpers() {
  const { products, setProducts } = useProducts();
  const { settings } = useSettings();
  const { cart, cartLines, subtotal, gstAmt, total, clearCart } = useCart();

  function checkout() {
    // reduce stock
    const next = products.map((p) => {
      if (!p.stock) return p;
      const c = cart.find((ci) => ci.id === p.id);
      if (!c) return p;
      return { ...p, stock: Math.max(0, p.stock - c.qty) };
    });
    if (!confirm("Sale completed. Stock updated.")) return;
    // store sale
    storeSalesProvider({ products, cart });
    // clear cart
    setProducts(next);
    clearCart();
  }

  

  function exportCSV() {
    const header = [
      "id",
      "name",
      "category",
      "unit",
      "cost",
      "sell",
      "stock",
      "stock value",
      "total value",
      "profit",
    ];
    const rows = products.map((p) => {
      const stockValue = p.cost * p.stock;
      const totalValue = p.sell * p.stock;
      const profit = totalValue - stockValue;
      return [
        p.id,
        p.name,
        p.category,
        p.unit,
        p.cost,
        p.sell,
        p.stock,
        stockValue.toFixed(2),
        totalValue.toFixed(2),
        profit.toFixed(2),
      ].join(",");
    });
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
  }

  function importCSV(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const lines = String(text).trim().split(/\r?\n/);
      const [hdr, ...rows] = lines;
      const cols = hdr.split(",");
      const idx = (k) => cols.indexOf(k);
      const parsed = rows.map((r) => {
        const c = r.split(",");
        return {
          id: c[idx("id")] || uid(),
          name: c[idx("name")] || "Item",
          category: c[idx("category")] || "Misc",
          unit: c[idx("unit")] || "pc",
          cost: Number(c[idx("cost")] || 0),
          sell: Number(c[idx("sell")] || 0),
          stock: Number(c[idx("stock")] || 0),
        };
      });
      setProducts([...products, ...parsed]);
    };
    reader.readAsText(file);
  }

  function printBill() {
    const lines = cartLines
      .map((l) => `${l.name} x ${l.qty} @ ${l.price} = ${l.line.toFixed(2)}`)
      .join("\n");
    const msg = `${settings.shopName}\n${
      settings.address
    }\n\nItems:\n${lines}\n\nSubtotal: ${subtotal.toFixed(2)}\n${
      settings.gst
        ? `GST (${settings.gstPercent}%): ${gstAmt.toFixed(2)}\n`
        : ""
    }${
      settings.deliveryCharge && settings.delivery ? `Delivery: ${settings.delivery}\n` : ""
    }Total: ${total.toFixed(2)}\n\nThanks!`;

    const style = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
      }
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<html><head><style>${style}</style></head><body>${msg}</body></html>`);
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
    window.print();
  }

  function whatsappText() {
    const lines = cartLines
      .map((l) => `${l.name} x ${l.qty} @ ${l.price} = ${l.line.toFixed(2)}`)
      .join("\n");
    const msg = `${settings.shopName}\n${
      settings.address
    }\n\nItems:\n${lines}\n\nSubtotal: ${subtotal.toFixed(2)}\n${
      settings.gst
        ? `GST (${settings.gstPercent}%): ${gstAmt.toFixed(2)}\n`
        : ""
    }${
      settings.deliveryCharge && settings.delivery ? `Delivery: ${settings.delivery}\n` : ""
    }Total: ${total.toFixed(2)}\n\nThanks!`;
    return encodeURIComponent(msg);
  }

  function openWhatsApp(phone) {
    const to = phone || settings.whatsapp;
    if (!to) {
      alert("Set a WhatsApp number in Settings or enter customer number.");
      return;
    }
    const url = `https://wa.me/${to}?text=${whatsappText()}`;
    window.open(url, "_blank");
  }

  function exportSalesCSV() {
    const sales = getSalesProvider();

    const header = [
      "id",
      "name",
      "qty",
      "line",
      "date",
      "time",
      "cost",
      "gst",
      "delivary",
      "profit",
    ];

    const rows = sales.map((s) => {
      const profit = (s.line - (s.cost || 0) * s.qty).toFixed(2);
      return [
        s.id,
        s.name,
        s.qty,
        s.line,
        s.date,
        s.time,
        s.cost ?? 0,
        s.gst ?? 0,
        s.delivary ?? 0,
        profit,
      ].join(",");
    });

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales.csv";
    a.click();
  }

  return {
    checkout,
    exportCSV,
    importCSV,
    whatsappText,
    openWhatsApp,
    printBill,
    getSales: getSalesProvider,
    exportSalesCSV,
  };
}
