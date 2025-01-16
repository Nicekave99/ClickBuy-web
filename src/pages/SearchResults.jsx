import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useClickbuyStore from "../store/clickbuy-store";
import ProductCard from "../components/card/ProductCard";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // ดึงคำค้นหา
  const products = useClickbuyStore((state) => state.products);
  const getProduct = useClickbuyStore((state) => state.getProduct);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  // กรองสินค้าตามคำค้นหา
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // จัดเรียงสินค้า
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0; // Default sorting
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false);
    }, 300); // Simulating loading time
  };

  useEffect(() => {
    // Reset current page to 1 when search query changes
    setCurrentPage(1);
    getProduct(100);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          การค้นหา "{searchQuery}"
          <span className="text-gray-600 text-sm">
            {" "}
            (จำนวน {filteredProducts.length} รายการ)
          </span>
        </h1>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-700">
            เรียงตาม:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="default">เรียงลำดับ</option>
            <option value="price-asc">ราคาต่ำไปสูง</option>
            <option value="price-desc">ราคาสูงไปต่ำ</option>
          </select>
        </div>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500">กำลังโหลด...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          ไม่พบสินค้าที่เกี่ยวข้องกับ "{searchQuery}"
        </p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-4 py-2 mx-1 rounded-lg shadow-md transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
