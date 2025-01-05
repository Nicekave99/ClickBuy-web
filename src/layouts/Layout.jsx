import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <MainNav />

      {/* Main Content */}
      <main className="flex-grow mx-auto w-full shadow-xl rounded-xl">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer className="py-6 flex-shrink-0" />
    </div>
  );
};

export default Layout;
