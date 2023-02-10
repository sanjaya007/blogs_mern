import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="main-wrapper">
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
