import React, { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import { FaBahtSign } from "react-icons/fa6";

import useClickbuyStore from "../../store/clickbuy-store";
import { getListAllUsers } from "../../api/admin";
import { dateTimeFormat } from "../../utils/dateformat";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const products = useClickbuyStore((state) => state.products);
  const [users, setUsers] = useState([]);
  const token = useClickbuyStore((state) => state.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getListAllUsers(token);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [token]);

  // กรองสินค้าที่มียอดขายเท่านั้น
  const filteredProducts = products.filter((product) => product.sold > 0);

  // คำนวณสินค้าในหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const stats = [
    {
      title: "ยอดขาย",
      value:
        "฿" +
        products
          .reduce((sum, product) => sum + product.price * product.sold, 0)
          .toFixed(2),
      icon: <FaBahtSign className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "ออเดอร์ทั้งหมด",
      value: products.reduce((sum, product) => sum + product.sold, 0),
      icon: <FiShoppingBag className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "จำนวนสินค้าที่ขายไปแล้ว",
      value: products.reduce((sum, product) => sum + product.sold, 0),
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "ลูกค้า",
      value: users.length,
      icon: <FiUsers className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ตารางยอดขาย</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          ตารางสินค้าที่ขายแล้ว
        </h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">ทั้งหมด</option>
          <option value="today">วันนี้</option>
          <option value="week">อาทิตย์นี้</option>
          <option value="month">เดือนนี้</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สินค้า
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ราคา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จำนวนที่ขายได้
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รวมราคาทั้งหมด
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                อัพเดทล่าสุด
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ฿{product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.sold}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ฿{(product.price * product.sold).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dateTimeFormat(product.updatedAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md mx-1 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md mx-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
