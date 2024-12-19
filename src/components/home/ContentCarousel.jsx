import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-gray-200 py-10">
      {/* Hero Banner */}
      <div className="w-full max-w-[1400px] mx-auto">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="w-full h-[500px] rounded-lg overflow-hidden mb-8"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.download_url}
                alt="banner"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Promotional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16 max-w-[1400px] mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-red-600 font-bold text-2xl mb-2">จัดส่งฟรี</h3>
          <p>เมื่อสั่งซื้อครบ 999 บาทขึ้นไป</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-yellow-600 font-bold text-2xl mb-2">ผ่อนชำระ</h3>
          <p>นานสูงสุด 10 เดือน</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-green-600 font-bold text-2xl mb-2">
            Onsite Service
          </h3>
          <p>แก้ไขปัญหาถึงที่บ้าน</p>
        </div>
      </div>

      {/* Small Carousel */}
      <div className="w-full max-w-[1400px] mx-auto">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="w-full mt-8 px-4 md:px-16"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.download_url}
                alt="thumbnail"
                className="w-full h-48 object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Brand Logos */}
      {/* <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-4 md:px-16 mt-12 max-w-[1400px] mx-auto">
        {[
          "https://liquidgaming.co.uk/pub/media/mageplaza/brand/Inno3D_Shop_by_Brand_Logo_1.png",
          "https://toppng.com/uploads/preview/intel-logo-transparent-11660082425tuq0impel3.png",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5xogyBpFdd28jpNUSHznWeEBqNDGpocMYIj6_ZpQtaNY4fPZKQ9p66bqE1onoPgbJP4&usqp=CAU",
          "https://e7.pngegg.com/pngimages/631/322/png-clipart-lenovo-logo-laptop-lenovo-thinkpad-thinkpad-x1-carbon-intel-dell-lenovo-logo-electronics-text-thumbnail.png",
          "https://via.placeholder.com/120x50?text=LG",
          "https://via.placeholder.com/120x50?text=logitech",
        ].map((logo, index) => (
          <div key={index} className="flex justify-center items-center">
            <img src={logo} alt={`logo-${index}`} className="w-auto h-12" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ContentCarousel;
