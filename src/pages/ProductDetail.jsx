import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { numberFormat } from "../utils/number";
import useClickbuyStore from "../store/clickbuy-store";
import BestSeller from "../components/home/BestSeller";
import { Swiper, SwiperSlide } from "swiper/react";
import PageTitle from "../components/PageTitle";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const actionADTCart = useClickbuyStore((state) => state.actionADTCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://clickbuy-api.vercel.app/api/product/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* รูปภาพสินค้า */}

        <div>
          {product.images && product.images.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              className="rounded-md shadow-lg"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    className="rounded-md w-full h-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              className="w-full h-96 bg-gray-200 rounded-md 
              text-center flex items-center justify-center shadow-md"
            >
              No Image
            </div>
          )}
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="flex flex-col gap-4">
          <PageTitle title={product ? product.title : "Loading..."} />
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>รายละเอียดสินค้าโดยย่อ</p>
          <p className="text-gray-600 text-xl">
            {product.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <span className="text-xl text-red-500 font-bold">
            ราคา {numberFormat(product.price) + " ฿"}
          </span>
          <span className="text-xl font-bold">
            จำนวนสินค้าคงเหลือ : {product.quantity}{" "}
          </span>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => actionADTCart(product)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2"
            >
              <ShoppingCart /> เพิ่มในตะกร้า
            </button>
            <Link
              to={"/cart"}
              onClick={() => actionADTCart(product)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2"
            >
              ซื้อเลย
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-5" />
      <p className="text-2xl font-bold text-center mb-4">สินค้าขายดี</p>
      <hr />
      <BestSeller />
    </div>
  );
};

export default ProductDetail;
