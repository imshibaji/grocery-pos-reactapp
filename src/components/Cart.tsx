import React from "react";
import { useUtils } from "../utils/utils";
import useSettings from "../utils/useSettings";
import { currency } from "../providers/products";

export default function Cart() {
    const { cartLines, subtotal, gstAmt, total, setQty, removeFromCart, checkout, openWhatsApp } = useUtils();
    const { settings, setSettings } = useSettings();
    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>Cart</h3>
            {cartLines.length === 0 ? <div className="small">No items in cart</div> : (
                <table>
                    <thead><tr><th>Item</th><th className="right">Qty</th><th className="right">Price</th><th className="right">Total</th><th></th></tr></thead>
                    <tbody>
                        {cartLines.map(l => (
                            <tr key={l.id}>
                                <td>{l.name}</td>
                                <td className="right"><input className="input" style={{ width: 50 }} type="number" value={l.qty} onChange={e => setQty(l.id, Number(e.target.value))}  /></td>
                                <td className="right">{currency(l.price)}</td>
                                <td className="right">{currency(l.line)}</td>
                                <td className="right"><button className="ghost" onClick={() => removeFromCart(l.id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: 10 }}>
                <div className="small">Subtotal: <strong>{currency(subtotal)}</strong></div>
                {settings!.gst && <div className="small">GST ({settings!.gstPercent}%): <strong>{currency(gstAmt)}</strong></div>}
                {settings!.deliveryCharge && settings!.delivery > 0 && <div className="small">Delivery: <strong>{currency(settings!.delivery)}</strong></div>}
                <div style={{ fontSize: 18, marginTop: 8 }}>Total: <strong>{currency(total)}</strong></div>

                <hr />
                <div style={{ display: "flex", gap: 8 }}>
                    <label><input type="checkbox" checked={settings!.gst} onChange={e => setSettings({ ...settings!, gst: e.target.checked })} /> Enable GST</label>
                    <label><input type="checkbox" checked={settings!.deliveryCharge} onChange={e => setSettings({ ...settings!, deliveryCharge: e.target.checked })} /> Enable Delivary Charge</label>
                </div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="button" onClick={checkout}>Complete Sale</button>
                <button className="ghost" onClick={() => { const phone = prompt("Customer WhatsApp number (country code, e.g. 919XXXXXXXXX)"); if (phone) openWhatsApp(phone); }}>Send Bill via WhatsApp</button>
            </div>
        </div>
    )
}