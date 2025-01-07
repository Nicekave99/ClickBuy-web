import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useClickbuyStore from "../store/clickbuy-store";
import { ShoppingBag, User } from "lucide-react";

const MainNav = () => {
  const carts = useClickbuyStore((s) => s.carts);
  const user = useClickbuyStore((s) => s.user);
  const logout = useClickbuyStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black text-gray-300 text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex gap-4">
            <span>📞 081 038 6756</span>
            <span>✉️ nicekave47@gmail.com</span>
            <span>ร้านขายอุปกรณ์ ฮาร์ดแวร์ อันดับหนึ่งใน Mbac</span>
          </div>
          <div className="flex gap-4">
            <span>บางพระ</span>
            <span>🌐 ไทย</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Click & Buy
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <form className="flex" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="ค้นหาสินค้า"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-medium"
                : "hover:text-red-500 font-medium"
            }
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-medium"
                : "hover:text-red-500 font-medium"
            }
          >
            สินค้าทั้งหมด
          </NavLink>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4 px-3">
          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ShoppingBag size={24} className="text-black" />
            {carts.length > 0 ? (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2">
                {carts.length}
              </span>
            ) : (
              <span className="absolute top-1 right-1 bg-gray-400 text-white text-xs rounded-full px-2">
                0
              </span>
            )}
          </NavLink>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <User size={24} className="text-black" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg z-50">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/history"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      History
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
