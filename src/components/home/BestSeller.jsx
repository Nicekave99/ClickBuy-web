import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/Product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await listProductBy("sold", "desc", 12); // เรียก API
      setData(res.data);
    } catch (err) {
      console.error("Error loading best seller products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100">
      <div className="container mx-auto py-8">
        {loading ? (
          <div className="text-center text-gray-500">กำลังโหลด...</div>
        ) : (
          <SwiperShowProduct>
            {data.length > 0 ? (
              data.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center col-span-full text-gray-500">
                ไม่มีสินค้าที่ขายดี
              </div>
            )}
          </SwiperShowProduct>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
