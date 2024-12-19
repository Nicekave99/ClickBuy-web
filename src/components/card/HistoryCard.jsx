import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useClickbuyStore from "../../store/clickbuy-store";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import { FaCheck, FaTimes, FaClock, FaTruck, FaBox } from "react-icons/fa";

const HistoryCard = () => {
  const token = useClickbuyStore((state) => state.token);
  // console.log(token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // code
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        ประวัติการสั่งซื้อ
      </h1>
      {/* คลุม */}
      <div className="space-y-4 overflow-x-auto rounded-lg shadow">
        {/* Card Loop Order*/}
        {orders?.map((item, index) => {
          // console.log(item)
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/* ทีมงาน header */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm">วันที่สั่งซื้อ</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${getStatusColor(item.orderStatus)} text-lg`}
                  >
                    {getStatusIcon(item.orderStatus)}
                  </span>
                  <span className="capitalize">{item.orderStatus}</span>
                </div>
              </div>
              {/* ทีมงาน table Loop Product*/}
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
                    {item.products?.map((product, index) => {
                      // console.log(product);
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-md font-medium text-gray-900">
                              {product.product.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-md font-medium text-gray-900 ">
                              {numberFormat(product.product.price)} ฿
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium whitespace-nowrap">
                            <div className="text-md text-gray-900">
                              {product.count}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium whitespace-nowrap">
                            <div className="text-md text-gray-900">
                              {numberFormat(
                                product.count * product.product.price
                              )}{" "}
                              ฿
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
