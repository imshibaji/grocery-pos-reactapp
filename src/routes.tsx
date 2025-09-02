import React from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/home";
import Inventory from "./pages/inventory";
import Sales from "./pages/sales";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/inventory",
                element: <Inventory />,
            }, 
            {
                path: "/sales",
                element: <Sales />,
            } 
        ]
    },
]);

export default router;