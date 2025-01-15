import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useClickbuyStore from "../store/clickbuy-store";
import { ShoppingBag, User } from "lucide-react";

const MainNav = () => {
  const carts = useClickbuyStore((s) => s.carts);
  const user = useClickbuyStore((s) => s.user);
  const logout = useClickbuyStore((s) => s.logout);
 const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({
    user: false,
    category: false,
  });
  const dropdownRefs = {
    user: useRef(null),
    category: useRef(null),
  };

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const closeDropdown = (e) => {
    Object.keys(dropdownRefs).forEach((type) => {
      if (
        dropdownRefs[type].current &&
        !dropdownRefs[type].current.contains(e.target)
      ) {
        setOpenDropdown((prev) => ({
          ...prev,
          [type]: false,
        }));
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // เมื่อเลื่อนลงมาเกิน 50px
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

     window.addEventListener('scroll', handleScroll);

    // ทำความสะอาด listener เมื่อ Component ถูกทำลาย
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

 
  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex gap-4 flex-wrap">
            <span>📞 081 038 6756</span>
            <span>✉️ nicekave47@gmail.com</span>
            <span>ร้านขายอุปกรณ์ ฮาร์ดแวร์ อันดับหนึ่งใน Mbac</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <span>MBAC บางพระ</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-300 bg-orange-600">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-white">
            Click & Buy
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-6 max-w-[500px] w-full">
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="ค้นหาสินค้า"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                ค้นหา
              </button>
            </form>
          </div>

          {/* Cart and User Section */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <NavLink
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <ShoppingBag size={24} className="text-black" />
              {carts.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRefs.user}>
              <button
                onClick={() => toggleDropdown("user")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <User size={24} className="text-black" />
              </button>

              {openDropdown.user && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
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
                        ประวัติการสั่งซื้อ
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                        >
                          แอดมิน
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        ลงชื่อออก
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`bg-gray-800 text-white ${isSticky ? 'sticky top-0 z-40' : ''}`}
      >
        <div className="container mx-auto px-4 py-2 flex justify-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-medium border-b-2 border-red-500"
                : "hover:text-red-500 font-medium"
            }
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-medium border-b-2 border-red-500"
                : "hover:text-red-500 font-medium"
            }
          >
            สินค้าทั้งหมด
          </NavLink>

          {/* Category Dropdown */}
          <div className="relative" ref={dropdownRefs.category}>
            <button
              onClick={() => toggleDropdown("category")}
              className="font-medium hover:text-red-500 focus:outline-none "
            >
              หมวดหมู่สินค้า
            </button>
            {openDropdown.category && (
              <div className="absolute left-0 mt-2 w-60 bg-white text-black shadow-lg rounded-lg z-50">
                <Link
                  to="/categories/15"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
                >
                  <img
                    className="w-8 bg-white rounded-lg inline-flex mr-3"
                    src="https://cdn-icons-png.flaticon.com/512/12120/12120437.png"
                    alt=""
                  />
                  ซีพียู
                </Link>
                <Link
                  to="/categories/14"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
                >
                  <img
                    className="w-8 bg-white rounded-lg inline-flex mr-3"
                    src="https://cdn-icons-png.flaticon.com/512/3870/3870550.png"
                    alt=""
                  />
                  เมนบอร์ด
                </Link>
                <Link
                  to="/categories/19"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
                >
                  <img
                    className="w-8 bg-white rounded-lg inline-flex mr-3"
                    src="https://cdn-icons-png.flaticon.com/512/4703/4703571.png"
                    alt=""
                  />
                  การ์ดจอ
                </Link>
                {/* More categories */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;

