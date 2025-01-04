import React from "react";
import { Trash2 } from "lucide-react";
import useClickbuyStore from "../../store/clickbuy-store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { createUserCart } from "../../api/user";

const Checkout = () => {
  const cart = useClickbuyStore((state) => state.carts);
  const user = useClickbuyStore((s) => s.user);
  const token = useClickbuyStore((s) => s.token);
  const getTotalPrice = useClickbuyStore((state) => state.getTotalPrice);
  const actionUpdateQuantity = useClickbuyStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useClickbuyStore(
    (state) => state.actionRemoveProduct
  );
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("err", err);
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">ตะกร้าสินค้า</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  รูปสินค้า
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium ">
                  ชื่อสินค้า
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium ">
                  ราคา
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium ">
                  จำนวน
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium ">
                  เงินรวม
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium ">ลบ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="px-6 py-4">
                    {item.images && item.images.length > 0 ? (
                      <img
                        className="w-16 h-16 object-cover rounded-lg"
                        src={item.images[0].url}
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm ">
                    {numberFormat(item.price)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.count}
                      onChange={(e) =>
                        actionUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {[...Array(item.quantity).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {numberFormat(item.price * item.count)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => actionRemoveProduct(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">
              ยอดรวมทั้งหมด
            </span>
            <span className="text-2xl font-bold text-red-600">
              {numberFormat(getTotalPrice())} บาท
            </span>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <Link to="/shop">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                เลือกซื้อสินค้าต่อ
              </button>
            </Link>
            <button
              disabled={cart.length < 1}
              onClick={handleSaveCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
