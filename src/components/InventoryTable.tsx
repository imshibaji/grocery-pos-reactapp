import React, { useState } from "react";
import { useProducts } from "../utils/useProducts";

export default function InventoryTable({ onImport, onAdd }) {
  const { products, setProducts, removeProduct } = useProducts();
  const [form, setForm] = useState({ name: "", category: "", unit: "", cost: "", sell: "", stock: "" });
  function add() {
    if (!form.name) return alert("Name required");
    onAdd({ name: form.name, category: form.category, unit: form.unit, cost: Number(form.cost), sell: Number(form.sell), stock: Number(form.stock) });
    setForm({ name: "", category: "", unit: "", cost: "", sell: "", stock: "" });
  }
  function update(id, patch) {
    setProducts(products.map(p => p.id === id ? { ...p, ...patch } : p));
  }
  function remove(id) {
    if (!confirm("Remove item?")) return;
    // setProducts(products.filter(p => p.id !== id));
    removeProduct(id);
  }
  return (
    <div>
      <hr style={{ marginTop: 16, marginBottom: 16 }} />

      <div style={{ marginTop: 16, maxHeight: "400px", overflowY: "auto" }}>
        <table className="table">
          <thead><tr><th>Item</th><th>Category</th><th>Unit</th><th className="right">Cost</th><th className="right">Sell</th><th className="right">Stock</th><th></th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><input className="input" value={p.name} onChange={e => update(p.id, { name: e.target.value })} /></td>
                <td><input className="input" value={p.category} onChange={e => update(p.id, { category: e.target.value })} /></td>
                <td><input className="input" value={p.unit} onChange={e => update(p.id, { unit: e.target.value })} /></td>
                <td className="right"><input className="input" type="number" value={p.cost} onChange={e => update(p.id, { cost: Number(e.target.value) })} /></td>
                <td className="right"><input className="input" type="number" value={p.sell} onChange={e => update(p.id, { sell: Number(e.target.value) })} /></td>
                <td className="right"><input className="input" type="number" value={p.stock} onChange={e => update(p.id, { stock: Number(e.target.value) })} /></td>
                <td className="right"><button className="ghost" onClick={() => remove(p.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr style={{ marginTop: 16, marginBottom: 16 }} />

      <div style={{ marginBottom: 16 }}>
        <div  className="item-add-form">
          <input className="input" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="input" placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <input className="input" placeholder="Unit" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} />
          <input className="input" placeholder="Cost" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} />
          <input className="input" placeholder="Sell" value={form.sell} onChange={e => setForm(f => ({ ...f, sell: e.target.value }))} />
          <input className="input" placeholder="Stock" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="button" onClick={add}>Add Item</button>
          <label className="ghost" style={{ padding: "6px 10px", display: "inline-block", cursor: "pointer" }}>
            Import CSV<input type="file" accept=".csv" style={{ display: "none" }} onChange={e => e.target.files && onImport(e.target.files[0])} />
          </label>
        </div>
      </div>
    </div>
  );
}