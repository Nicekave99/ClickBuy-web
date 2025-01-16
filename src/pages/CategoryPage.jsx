import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";
import useClickbuyStore from "../store/clickbuy-store";
import SearchFilter from "../components/card/SearchFilter";

const CategoryPages = () => {
  const { categoryId } = useParams(); // ดึง categoryId จาก URL
  const getCategory = useClickbuyStore((state) => state.getCategory);
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const categories = useClickbuyStore((state) => state.categories);
  const products = useClickbuyStore((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    getCategory(100);
    getProduct(100);
  }, [getCategory, getProduct]);

  useEffect(() => {
    if (products.length > 0) {
      // กรองสินค้าตาม categoryId และข้อความค้นหา
      const categoryProducts = products.filter(
        (product) =>
          (!categoryId || String(product.categoryId) === String(categoryId)) &&
          (!searchText ||
            product.name.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredProducts(categoryProducts);
    }
  }, [categoryId, products, searchText]);

  // คำนวณ Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="flex overflow-hidden w-full max-w-7xl">
        {/* Sidebar */}
        <div className="w-1/4 h-screen p-4 bg-gray-100">
          <SearchFilter setSearchText={setSearchText} />
        </div>

        {/* Content */}
        <main className="p-4 h-screen flex flex-col flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">
            สินค้าในหมวดหมู่:{" "}
            {categories.find((cat) => String(cat.id) === String(categoryId))
              ?.name || "ไม่ทราบ"}
          </h1>
          {currentProducts.length === 0 ? (
            <p className="text-gray-500">ไม่มีสินค้าในหมวดหมู่นี้</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-stretch gap-4">
                {currentProducts.map((item, index) => (
                  <ProductCard key={index} item={item} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPages;
