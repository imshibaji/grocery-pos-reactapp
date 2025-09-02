import React from "react";
import InventoryManager from "../components/InventoryManager";
import Settings from "../components/Settings";
import { useUtils } from "../utils/utils";

export default function Inventory() {
    const { importCSV, addProduct, exportCSV } = useUtils();

    return (
        <div className="grid">
            <div>
                <InventoryManager exportCSV={exportCSV} importCSV={importCSV} addProduct={addProduct} />
            </div>
            <div>
                <Settings />
            </div>
        </div>
    );
}