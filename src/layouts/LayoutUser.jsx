import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <div>
      <MainNav />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;