import React from "react";
import useHelpers from "../utils/helpers";

export default function Sales() {
    const { getSales, exportSalesCSV } = useHelpers();
    const sales = getSales().reverse();

    return (
        <div>
            <div className="card" style={{ marginBottom: 16, padding: "2px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>Sales</h3>
                    <button className="button" onClick={() => exportSalesCSV()}>Export to CSV</button>
                </div>
            </div>
            <div className="grid">
                <div className="card" style={{ overflow: "auto", height: "500px" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Line</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Order Id</th>
                                <th>Cost</th>
                                <th>GST</th>
                                <th>Delivery</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length > 0 && sales.map((s, i) => (
                                <tr key={`${s.date}-${s.id}-${i}`}>
                                    <td>{s.name}</td>
                                    <td>{s.qty}</td>
                                    <td>{s.line}</td>
                                    <td>{s.date}</td>
                                    <td>{s.time}</td>
                                    <td>{s.orderId}</td>
                                    <td>{s.cost}</td>
                                    <td>{s.gst}</td>
                                    <td>{s.delivary}</td>
                                    <td>{s.profit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card">
                    <div>
                        <h2 style={{ marginTop: 0, marginBottom: 4 }}>Sales Summary</h2>
                        <hr />
                        <div>Total Prods: <b>{sales.length}</b> items sold</div>
                        <div>Total Qty: <b>{sales.reduce((a, b) => a + b.qty, 0)}</b> units sold</div>
                        <hr />
                        <div className="right">Total Sales: <b>₹{sales.reduce((a, b) => a + b.line, 0).toFixed(2)}/-</b></div>
                        <div className="right">Total Cost: <b>₹{sales.reduce((a, b) => a + b.cost, 0).toFixed(2)}/-</b></div>
                        <hr />
                        <div className="right">Profit: <b>₹{sales.reduce((a, b) => a + b.profit, 0).toFixed(2)}/-</b></div>
                    </div>
                </div>
            </div>
        </div>
    );
}