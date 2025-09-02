import React from "react";
import useSettings from "../utils/useSettings";
import { Settings } from "../reducers/settings";

export default function Settings() {
    const { settings, setSettings } = useSettings();
    
    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>Settings</h3>
            <div style={{ display: "grid", gap: 8 }}>
                <input className="input" placeholder="Shop name" value={settings.shopName} onChange={e => setSettings({ ...settings, shopName: e.target.value })} />
                <input className="input" placeholder="Address" value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} />
                <input className="input" placeholder="Default WhatsApp (919...)" value={settings.whatsapp} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} />
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <label>GST Percent</label>
                    <input className="input" style={{ width: 80 }} type="number" placeholder="GST %" value={settings.gstPercent} onChange={e => setSettings({ ...settings, gstPercent: Number(e.target.value) })} />
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <label>Delivery Charge</label>
                    <input className="input" style={{ width: 80 }} type="number" placeholder="Delivery charge" value={settings.delivery} onChange={e => setSettings({ ...settings, delivery: Number(e.target.value) })} />
                </div>
                
                <div className="footer-note">Data saved in your browser. Export CSV to backup inventory.</div>
            </div>
        </div>
    );
}