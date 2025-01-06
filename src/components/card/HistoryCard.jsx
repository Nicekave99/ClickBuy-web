import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useClickbuyStore from "../../store/clickbuy-store";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import { FaCheck, FaTimes, FaClock, FaBox } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HistoryCard = () => {
  const token = useClickbuyStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [startDate, endDate, orders]);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
        setFilteredOrders(res.data.orders); // Initially display all orders
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filterOrders = () => {
    if (startDate || endDate) {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.updatedAt);
        return (
          (!startDate || orderDate >= startDate) &&
          (!endDate || orderDate <= endDate)
        );
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Not Process":
        return <FaClock />;
      case "Processing":
        return <FaBox />;
      case "Completed":
        return <FaCheck />;
      case "Cancelled":
        return <FaTimes />;
      default:
        return null;
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        ประวัติการสั่งซื้อ
      </h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <p className="text-sm mb-1">วันที่เริ่มต้น</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-3 py-2 rounded-md"
            placeholderText="เลือกวันที่เริ่มต้น"
          />
        </div>
        <div>
          <p className="text-sm mb-1">วันที่สิ้นสุด</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-3 py-2 rounded-md"
            placeholderText="เลือกวันที่สิ้นสุด"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4 overflow-x-auto rounded-lg shadow">
        {currentItems?.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            {/* Header */}
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm">วันที่สั่งซื้อ</p>
                <p className="font-bold">{dateFormat(item.updatedAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`${getStatusColor(item.orderStatus)} text-lg`}>
                  {getStatusIcon(item.orderStatus)}
                </span>
                <span className="capitalize">{item.orderStatus}</span>
              </div>
            </div>

            {/* Table */}
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ชื่อสินค้า
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
                      จำนวนสินค้า
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ราคาสุทธิ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {item.products?.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md font-medium text-gray-900">
                          {product.product.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md font-medium text-gray-900">
                          {numberFormat(product.product.price)} ฿
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {product.count}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {numberFormat(product.count * product.product.price)} ฿
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
                      ราคาทั้งหมด
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {numberFormat(item.cartTotal)} ฿
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
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
    </div>
  );
};

export default HistoryCard;
