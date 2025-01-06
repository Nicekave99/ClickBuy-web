import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  updateCategory,
  removeCategory,
} from "../../api/Category";
import useClickbuyStore from "../../store/clickbuy-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useClickbuyStore((state) => state.token);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const categories = useClickbuyStore((state) => state.categories);
  const getCategory = useClickbuyStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("กรุณากรอกชื่อหมวดหมู่ !");
    }
    try {
      if (editId) {
        const res = await updateCategory(token, editId, { name });
        toast.success(`หมวดหมู่ >  ${res.data.name} แก้ไขสำเร็จแล้ว !`);
        setEditId(null);
      } else {
        const res = await createCategory(token, { name });
        toast.success(`หมวดหมู่ >  ${res.data.name} สร้างสำเร็จแล้ว !`);
      }
      setName("");
      getCategory(token);
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกหมวดหมู่");
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`หมวดหมู่ >  ${res.data.name} ลบสำเร็จแล้ว !`);
      getCategory(token);
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
      console.error(err);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditId(category.id);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        การจัดการหมวดหมู่สินค้า
      </h1>

      {/* Search Section */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="ค้นหาหมวดหมู่"
        className="w-full mb-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Form Section */}
      <form className="flex items-center mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={editId ? "แก้ไขชื่อหมวดหมู่" : "เพิ่มชื่อหมวดหมู่"}
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`ml-4 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
          }`}
        >
          {editId ? "แก้ไข" : "เพิ่มหมวดหมู่"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
            }}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            ยกเลิก
          </button>
        )}
      </form>

      <hr className="my-6" />

      {/* Categories List Section */}
      <ul className="space-y-4">
        {paginatedCategories.length === 0 ? (
          <li className="text-gray-500">ไม่มีหมวดหมู่สินค้าในระบบ</li>
        ) : (
          paginatedCategories.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md hover:shadow-md"
            >
              <span className="text-lg font-medium text-gray-800">
                {item.name}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  ลบ
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white focus:ring-blue-400"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      )}
    </div>
  );
};

export default FormCategory;
