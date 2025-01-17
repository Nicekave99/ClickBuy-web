import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";
import useClickbuyStore from "../store/clickbuy-store";

const CategoryPages = () => {
  const { categoryId } = useParams(); // ดึง categoryId จาก URL
  const getCategory = useClickbuyStore((state) => state.getCategory);
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const categories = useClickbuyStore((state) => state.categories);
  const products = useClickbuyStore((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  // ดึงข้อมูลหมวดหมู่และสินค้า
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getCategory(100);
        await getProduct(100);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getCategory, getProduct]);

  // กรองสินค้าตาม categoryId และ searchText
  useEffect(() => {
    if (products.length > 0) {
      const categoryProducts = products.filter(
        (product) =>
          (!categoryId || String(product.categoryId) === String(categoryId)) &&
          (!searchText ||
            product.name.toLowerCase().includes(searchText.toLowerCase()))
      );

      // การจัดเรียงสินค้า
      const sortedProducts = [...categoryProducts].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        return 0; // Default sorting
      });

      setFilteredProducts(sortedProducts);
    }
  }, [categoryId, products, searchText, sortOption]);

  // รีเซ็ตหน้า Pagination เมื่อข้อมูลที่กรองเปลี่ยน
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

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
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          สินค้าในหมวดหมู่:{" "}
          {categories.find((cat) => String(cat.id) === String(categoryId))
            ?.name || "ไม่ทราบ"}
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
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500">กำลังโหลด...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          ไม่มีสินค้าในหมวดหมู่นี้
        </p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {currentProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
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
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPages;
