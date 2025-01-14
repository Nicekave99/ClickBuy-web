import React, { useEffect, useState } from "react";
import useClickbuyStore from "../../store/clickbuy-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchFilter = () => {
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const actionSearchFilters = useClickbuyStore(
    (state) => state.actionSearchFilters
  );

  const [text, setText] = useState("");
  const [price, setPrice] = useState([0, 100000]);
  const [ok, setOk] = useState(false);

  // Fetch Products Initially
  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // Search Text
  useEffect(() => {
    if (!text) {
      getProduct();
      return;
    }

    const delaySearch = setTimeout(() => {
      actionSearchFilters({ query: text });
    }, 100);

    return () => clearTimeout(delaySearch);
  }, [text, actionSearchFilters, getProduct]);

  // Search by Price
  useEffect(() => {
    if (price[0] <= price[1]) {
      actionSearchFilters({ price });
    }
  }, [ok]);

  const handlePrice = (value) => {
    const validatedPrice = [
      Math.max(0, value[0]),
      Math.min(100000, Math.max(value[0], value[1])),
    ];
    setPrice(validatedPrice);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-sm mx-auto">
      {/* Header */}
      <h1 className="text-lg font-bold text-center mb-6">ค้นหาสินค้า</h1>

      {/* Search By Text */}
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้าที่นี่..."
        className="border rounded-md w-full px-3 py-2 mb-4"
      />

      <hr className="my-4" />

      {/* Search By Price */}
      <div>
        <h2 className="text-md font-semibold mb-4">ช่วงราคา</h2>
        <div className="flex items-center justify-between mb-2">
          <input
            type="number"
            value={price[0]}
            onChange={(e) => handlePrice([+e.target.value, price[1]])}
            className="w-24 border rounded-md px-2 py-1 text-center"
            min="0"
            max="100000"
          />
          <span className="text-sm font-medium">-</span>
          <input
            type="number"
            value={price[1]}
            onChange={(e) => handlePrice([price[0], +e.target.value])}
            className="w-24 border rounded-md px-2 py-1 text-center"
            min="0"
            max="100000"
          />
        </div>
        <Slider
          onChange={handlePrice}
          range
          min={0}
          max={100000}
          defaultValue={[0, 100000]}
          value={price}
          trackStyle={{ backgroundColor: "#FF6B6B" }}
          handleStyle={{ borderColor: "#FF6B6B" }}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
