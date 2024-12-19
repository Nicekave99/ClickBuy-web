import React from "react";
import { ShoppingCart } from "lucide-react";
import useClickbuyStore from "../../store/clickbuy-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionADTCart = useClickbuyStore((state) => state.actionADTCart);
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className=" border rounded-md shadow-md p-2 w-48 ">
        <div>
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              className="rounded-md w-full h-48 
                        hover:scale-110 transition-all duration-200 ease-in-out
                      
                      "
            />
          ) : (
            <div
              className="w-full h-48 bg-gray-200 rounded-md 
        text-center flex items-center justify-center shadow-md
        "
            >
              No Image
            </div>
          )}
        </div>
        <div className="py-2">
          <h3 className="text-[0.8rem] font-bold text-ellipsis  line-clamp-3">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 truncate">{item.description}</p>
        </div>
        <div className="flex justify-between items-center px-2">
          <span className="text-xl font-bold  ">
            {numberFormat(item.price) + " ฿"}
          </span>
          <button
            onClick={() => actionADTCart(item)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md"
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
