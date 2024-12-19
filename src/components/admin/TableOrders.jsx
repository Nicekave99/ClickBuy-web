import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useClickbuyStore from "../../store/clickbuy-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import { FaCheck, FaTimes, FaClock, FaTruck, FaBox } from "react-icons/fa";

const TableOrders = () => {
  const token = useClickbuyStore((s) => s.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("Update Status Success!!!");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Not Process":
        return <FaClock className="text-yellow-500" />;
      case "Processing":
        return <FaBox className="text-blue-500" />;
      case "Completed":
        return <FaCheck className="text-green-500" />;
      case "Cancelled":
        return <FaTimes className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Order Management
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ลำดับ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ผู้ใช้งาน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                วันที่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สินค้า
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รวม
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">
                    {order.orderedBy.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.orderedBy.address}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {dateFormat(order.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.products.map((product, index) => (
                    <li key={index} className="list-none">
                      {product.product.title} {"  "}
                      <span className="text-sm text-gray-500">
                        {product.count} x {numberFormat(product.product.price)}
                      </span>
                    </li>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {numberFormat(order.cartTotal)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-2">
                  {getStatusIcon(order.orderStatus)}
                  <span className="capitalize">{order.orderStatus}</span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, order.id, e.target.value)
                    }
                    className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Not Process">Not Process</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                className="px-6 py-4 text-sm font-medium text-gray-900"
                colSpan="4"
              >
                Total
              </td>
              <td
                className="px-6 py-4 text-sm font-medium text-gray-900"
                colSpan="3"
              >
                {numberFormat(
                  orders.reduce((sum, order) => sum + order.cartTotal, 0)
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
