import React, { useCallback, useEffect, useState } from "react";
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

  //  Step 1 Search Text
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

  //  Step 2 Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value; // ค่าที่เรา Check
    const inState = [...categorySelected]; // [] arr ว่าง
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ จะ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1); // ลบออก
    }
    setCategorySelected(inState);
    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  //  Step 3 Search by price
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
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-xl font-bold text-center mb-4">ค้นหาสินค้า</h1>
      {/* Search By text */}
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้าที่นี้...."
        className="border rounded-md w-full mb-4 px-2 py-2"
      />
      <hr />
      {/* Search by Category */}
      <div>
        <h1 className="text-xl font-bold text-center mt-4 mb-4">
          หมวดหมู่สินค้า
        </h1>
        <div>
          {categories.map((item, index) => (
            <div key={index} className="flex gap-2 justify-center mb-2">
              <input onChange={handleCheck} value={item.id} type="checkbox" />
              <label className="text-xl font-mono ">{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* Search By Price */}
      <div>
        <h1 className="text-xl font-bold text-center mt-4 mb-4">ค้นหาราคา</h1>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span>MIN : {price[0]}</span>
            <span>MAX :{price[1]}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[0, 100000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
