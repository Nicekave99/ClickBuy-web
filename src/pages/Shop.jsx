import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useClickbuyStore from "../store/clickbuy-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";
import { Helmet } from "react-helmet";

const Shop = () => {
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const products = useClickbuyStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex ">
      <Helmet>
        <title>สินค้า - ClickBuy</title>
        <meta name="description" content="คำอธิบายหน้าแรก" />
      </Helmet>

      <div className="w h-screen p-4 bg-gray-100">
        <SearchCard />
      </div>

      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap justify-stretch gap-4">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto ml-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;
