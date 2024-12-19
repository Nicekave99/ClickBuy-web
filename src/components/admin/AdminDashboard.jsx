import React, { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import useClickbuyStore from "../../store/clickbuy-store";
import { getListAllUsers } from "../../api/admin";
import { dateTimeFormat } from "../../utils/dateformat";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const products = useClickbuyStore((state) => state.products);
  const [users, setUsers] = useState([]);
  const token = useClickbuyStore((state) => state.token);

  useEffect(() => {
    // ฟังก์ชันจำลองสำหรับดึงข้อมูลผู้ใช้
    const fetchUsers = async () => {
      try {
        const res = await getListAllUsers(token); // แทนที่ด้วย API ที่คุณใช้
        setUsers(res.data); // ตั้งค่าผู้ใช้
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [token]);

  const stats = [
    {
      title: "ยอดขาย",
      value:
        "฿" +
        products
          .reduce((sum, product) => sum + product.price * product.sold, 0)
          .toFixed(2),
      icon: <FiDollarSign className="w-6 h-6" />,
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
        <h2 className="text-2xl font-bold text-gray-800">ตารางสินค้าที่ขาย</h2>
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                สินค้า
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ราคา
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                จำนวนที่ขายได้
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                รวมราคาทั้งหมด
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                อัพเดทล่าสุด
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
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
          <tfoot className="bg-gray-50">
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                colSpan="3"
              >
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                $
                {products
                  .reduce(
                    (sum, product) => sum + product.price * product.sold,
                    0
                  )
                  .toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
