import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import useClickbuyStore from "../store/clickbuy-store";
import SearchCard from "../components/card/SearchCard";

const Shop = () => {
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const products = useClickbuyStore((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    getProduct(100);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="flex overflow-hidden w-full max-w-7xl">
        {/* Sidebar */}
        <div className="w-1/4 h-screen p-4 bg-gray-100">
          <SearchCard />
        </div>

        {/* Content */}
        <main className="p-4 h-screen flex flex-col flex-1 overflow-y-auto">
          <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
          <div className="flex flex-wrap justify-stretch gap-4">
            {currentProducts.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-2 mx-1 rounded-md ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
