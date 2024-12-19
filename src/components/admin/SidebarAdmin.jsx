import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Pen,
  TicketPlus,
  UserRoundPen,
  LogOut,
} from "lucide-react";

const SidebarAdmin = () => {
  return (
    <div className="bg-orange-600 w-64 text-gray-100 flex flex-col h-screen">
      <div className="h-24 bg-orange-700 flex items-center justify-center text-2xl font-bold">
        เมนู แอดมิน
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-orange-950 text-white hover:bg-orange-800 px-4 py-2 rounded-md flex items-center space-x-2"
              : "text-gray-300 px-4 py-2 hover:bg-orange-900 hover:text-white rounded-md flex items-center space-x-2"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-orange-950 text-white hover:bg-orange-800 px-4 py-2 rounded-md flex items-center space-x-2"
              : "text-gray-300 px-4 py-2 hover:bg-orange-900 hover:text-white rounded-md flex items-center space-x-2"
          }
        >
          <UserRoundPen className="mr-2" />
          จัดการผู้ใช้
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-orange-950 text-white hover:bg-orange-800 px-4 py-2 rounded-md flex items-center space-x-2"
              : "text-gray-300 px-4 py-2 hover:bg-orange-900 hover:text-white rounded-md flex items-center space-x-2"
          }
        >
          <Pen className="mr-2" />
          หมวดหมู่สินค้า
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-orange-950 text-white hover:bg-orange-800 px-4 py-2 rounded-md flex items-center space-x-2"
              : "text-gray-300 px-4 py-2 hover:bg-orange-900 hover:text-white rounded-md flex items-center space-x-2"
          }
        >
          <PackagePlus className="mr-2" />
          จัดการสินค้า
        </NavLink>
        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-orange-950 text-white hover:bg-orange-800 px-4 py-2 rounded-md flex items-center space-x-2"
              : "text-gray-300 px-4 py-2 hover:bg-orange-900 hover:text-white rounded-md flex items-center space-x-2"
          }
        >
          <TicketPlus className="mr-2" />
          จัดการออเดอร์
        </NavLink>
      </nav>

      <div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LogOut className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
