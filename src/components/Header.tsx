import React from "react";
import useSettings from "../utils/useSettings";
import { Link } from "react-router";

export default function Header({ exportCSV }: any) {
    const { settings } = useSettings();
    
    
    return (
        <div className="header row">
            <div>
                <h1 style={{ margin: 0 }}>{settings.shopName}</h1>
                <div className="small">{settings.address}</div>
            </div>
            <div style={{ textAlign: "right" }}>
                <div className="small">Lean Grocery POS • LocalStorage</div>
                <div style={{ marginTop: 8 }}>
                    <Link to="/" className="button" style={{ marginLeft: 8, textDecoration: "none" }}>Billing Manager</Link>
                    <Link to="/inventory" className="button" style={{ marginLeft: 8, textDecoration: "none" }}>Store Manager</Link>
                    <Link to="/sales" className="button" style={{ marginLeft: 8, textDecoration: "none" }}>Sales Report</Link>
                </div>
            </div>
        </div>
    );
}