import React, { useEffect, useState } from "react";
import useClickbuyStore from "../../store/clickbuy-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const products = useClickbuyStore((state) => state.products);
  const actionSearchFilters = useClickbuyStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useClickbuyStore((state) => state.getCategory);
  const categories = useClickbuyStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 100000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // Search Text
  useEffect(() => {
    if (!text) {
      getProduct();
      return;
    }

    const delaySearch = setTimeout(() => {
      actionSearchFilters({ query: text });
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [text, actionSearchFilters, getProduct]);

  // Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);
    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  // Search by Price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
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

      {/* Search by Category */}
      <div>
        <h2 className="text-md font-semibold mb-4">หมวดหมู่สินค้า</h2>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                onChange={handleCheck}
                value={item.id}
                type="checkbox"
                className="mr-3"
              />
              <label className="text-sm font-medium">{item.name}</label>
            </div>
          ))}
        </div>
      </div>

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
          />
          <span className="text-sm font-medium">-</span>
          <input
            type="number"
            value={price[1]}
            onChange={(e) => handlePrice([price[0], +e.target.value])}
            className="w-24 border rounded-md px-2 py-1 text-center"
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

export default SearchCard;
