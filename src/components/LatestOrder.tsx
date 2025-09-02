import React from "react";
import { useUtils } from "../utils/utils";
import { currency } from "../providers/products";
import useSettings from "../utils/useSettings";


export function LatestOrder() {
    const { cartLines, subtotal, gstAmt, total, checkout, openWhatsApp} = useUtils();
    const { settings } = useSettings();
    return (
        <div className="card">
            <h3>Latest Order</h3>
            {cartLines.length === 0 ? <div className="small">No items in cart</div> : (
                <table className="table">
                    <thead><tr><th>Item</th><th className="right">Qty</th><th className="right">Price</th><th className="right">Total</th><th></th></tr></thead>
                    <tbody>
                        {cartLines.map(l => (
                            <tr key={l.id}>
                                <td>{l.name}</td>
                                <td className="right">{l.qty}</td>
                                <td className="right">{currency(l.price)}</td>
                                <td className="right">{currency(l.line)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: 10 }}>
                <div className="small">Subtotal: <strong>{currency(subtotal)}</strong></div>
                {settings.gst && <div className="small">GST ({settings.gstPercent}%): <strong>{currency(gstAmt)}</strong></div>}
                {settings.delivery > 0 && <div className="small">Delivery: <strong>{currency(settings.delivery)}</strong></div>}
                <div style={{ fontSize: 18, marginTop: 8 }}>Total: <strong>{currency(total)}</strong></div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="button" onClick={checkout}>Print Bill</button>
                <button className="ghost" onClick={() => { const phone = prompt("Customer WhatsApp number (country code, e.g. 919XXXXXXXXX)"); if (phone) openWhatsApp(phone); }}>Send Bill via WhatsApp</button>
            </div>
        </div>
    );
}