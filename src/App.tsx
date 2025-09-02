import React from "react";
import { useUtils } from "./utils/utils";

import Header from "./components/Header";
import useSettings from "./utils/useSettings";
import Home from "./pages/home";
import Inventory from "./pages/inventory";
import { Outlet } from "react-router";


export default function App() {
  const { exportCSV } = useUtils();
  const { settings } = useSettings();

  return (
    <div className="container">
      <Header settings={settings} exportCSV={exportCSV} />
      <Outlet />
    </div>
  );
}
