import React from "react";
import InventoryTable from "./InventoryTable";
import { useUtils } from "../utils/utils";

export default function InventoryManager() {
    const { exportCSV, importCSV, addProduct } = useUtils();
    return (
        <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Inventory</h3>
                <button className="button" style={{ margin: 8 }} onClick={() => exportCSV()}>Export CSV</button>
            </div>
            <div>
                <InventoryTable onImport={importCSV} onAdd={addProduct} />
            </div>
        </div>
    );
}