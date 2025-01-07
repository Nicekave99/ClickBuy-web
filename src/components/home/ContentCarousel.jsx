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
    const customImages = [
      {
        id: 1,
        download_url:
          "https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F17349367356769089fe73e8.&w=1200&q=75",
      },
      {
        id: 2,
        download_url:
          "https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F173077579067298aeec6d0e.&w=1200&q=75",
      },
      {
        id: 3,
        download_url:
          "https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F17313066886731a4c0cf474.jpg&w=1200&q=75",
      },
      {
        id: 4,
        download_url:
          "https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F17337354936756b4459b07d.jpg&w=1200&q=75",
      },
    ];
    setData(customImages);
  };

  return (
    <div className="bg-gray-200 round ">
      {/* Hero Banner */}
      <div className="container mx-auto  py-4  ">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="w-full h-[200px] sm:h-[400px] rounded-md overflow-hidden "
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.download_url}
                alt="banner"
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Promotional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-18 max-w-[1400px] mx-auto py-4">
        <img
          src="https://i.imgur.com/750ZABJ.png"
          className="bg-white shadow-lg rounded-lg hover:translate-x-1 hover:opacity-70 transition-all duration-300 w-full h-full object-fill"
        />

        <img
          src="https://i.imgur.com/7mFKl6g.jpeg"
          className="bg-white shadow-lg rounded-lg hover:translate-x-1 hover:opacity-70 transition-all duration-300 w-full h-full object-fill"
        />

        <img
          src="https://i.imgur.com/4LBy6wE.jpeg"
          className="bg-white shadow-lg rounded-lg hover:translate-x-1 hover:opacity-70 transition-all duration-300 w-full h-full object-fill"
        />
      </div>
    </div>
  );
};

export default ContentCarousel;
