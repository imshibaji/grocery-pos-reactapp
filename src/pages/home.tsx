import React from "react";
import ProductsList from "../components/ProductsList";
import Cart from "../components/Cart";
import { LatestOrder } from "../components/LatestOrder";

export default function Home() {
    return (
        <div className="grid">
            <div>
                <ProductsList />
            </div>
            <div>
                <Cart />
                {/* <LatestOrder /> */}
            </div>
        </div>
    );
}