import React from "react";
import { useUtils } from "../utils/utils";
import { currency } from "../providers/products";

export default function ProductsList() {
    const { query, setQuery, filtered, addToCart, setToCart } = useUtils();
    return (
        <div className="card">
            <input className="input" placeholder="Search items..." value={query} onChange={e => setQuery(e.target.value)} />
            <div style={{ height: 10 }} />
            <div className="list-grid">
                {filtered.map(p => (
                    <div key={p.id} className="item-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>{p.name}</div>
                                <div className="small">{p.category} • {p.unit} • Stock: {p.stock}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: 700 }}>{currency(p.sell)}</div>
                                <div style={{ fontSize: 13, color: "#6b7280" }}>Profit: {currency(p.sell - p.cost)}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="counter">
                                <button className="ghost" onClick={() => addToCart(p.id)}>Add</button>
                                <div className="small"> / </div>
                                <div className="small">Stock {p.stock}</div>
                            </div>
                            <div>
                                <button className="button" onClick={() => { const q = prompt("Enter quantity", "1"); if (q) setToCart(p.id, Number(q)); }}>Quick Add</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}