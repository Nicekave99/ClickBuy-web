import React, { useEffect } from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>หน้าแรก - ClickBuy</title>
        <meta name="description" content="คำอธิบายหน้าแรก" />
      </Helmet>

      <ContentCarousel />
      <p className="font-bold text-3xl my-10 text-center  ">สินค้าขายอย่างดี</p>
      <BestSeller />
      <p className="font-bold text-2xl my-10 text-center">สินค้าเข้าใหม่</p>
      <NewProduct />
    </div>
  );
};

export default Home;
