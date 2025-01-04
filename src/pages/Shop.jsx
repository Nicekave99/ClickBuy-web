import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import useClickbuyStore from "../store/clickbuy-store";
import SearchCard from "../components/card/SearchCard";
import { Helmet } from "react-helmet";

const Shop = () => {
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const products = useClickbuyStore((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    getProduct();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex ">
      <Helmet>
        <title>สินค้า - ClickBuy</title>
        <meta name="description" content="คำอธิบายหน้าแรก" />
      </Helmet>

      <div className="w-1/4 h-screen p-4 bg-gray-100">
        <SearchCard />
      </div>

      <div className="p-4 h-screen flex flex-col flex-1">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap justify-stretch gap-4">
          {currentProducts.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span>
            หน้า {currentPage} จาก {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
