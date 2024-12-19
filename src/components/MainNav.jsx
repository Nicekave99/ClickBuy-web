import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useClickbuyStore from "../store/clickbuy-store";
import { ShoppingBasket, ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useClickbuyStore((s) => s.carts);
  const user = useClickbuyStore((s) => s.user);
  const admin = useClickbuyStore((s) => s.admin);
  const logout = useClickbuyStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 shadow-md position: sticky top-0 z-50">
      <div className="mx-auto px-5">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6 text-white">
            <Link to={"/"} className="text-2xl font-bold">
              Click&Buy
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-black  text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-black  text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-black text-sm font-medium"
                  : "hover:bg-slate-200  px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/cart"}
            >
              <ShoppingBasket />
              {carts.length > 0 && (
                <span
                  className="absolute top-0
               bg-red-500 rounded-full px-2"
                >
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>
          {user ? (
            <div className="flex items-center gap-5 text-white relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-gray-300 
        px-3 py-2 rounded-md text-sm font-medium"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/512/batman-icon.png"
                  alt="User Avatar"
                />
                {user.email}
                <ChevronDown />
              </button>
              {isOpen && (
                <div className="absolute top-16 bg-white shadow-md rounded-md">
                  <Link
                    to={"/history"}
                    className="block px-16 py-2 text-black hover:bg-gray-200"
                  >
                    History
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to={"/admin"}
                      className="block px-16 py-2 text-blue-600 hover:bg-gray-200"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block px-16 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-5 text-white">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                }
                to={"/register"}
              >
                Register
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
