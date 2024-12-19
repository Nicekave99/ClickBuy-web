import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useClickbuyStore from "../../store/clickbuy-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useClickbuyStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useClickbuyStore((state) => state.categories);
  const getCategory = useClickbuyStore((state) => state.getCategory);
  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("กรุณากรอกชื่อหมวดหมู่ !");
    }
    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success(`หมวดหมู่ >  ${res.data.name} สร้างสำเร็จแล้ว !`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`หมวดหมู่ >  ${res.data.name} ลบสำเร็จแล้ว !`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-300 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-2">การจัดการหมวดหมู่สินค้า</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black rounded-md p-2"
          type="text"
        />
        <button className="bg-blue-400 rounded-md p-2 ml-2">
          ยืนยันเพิ่มหมวดหมู่
        </button>
      </form>

      <hr />

      <ul className="list-none">
        {categories.map((item, index) => (
          <li className="flex justify-between items-center my-3  " key={index}>
            <span>{item.name}</span>

            <button
              className="bg-red-400 rounded-md p-2 ml-2"
              onClick={() => handleRemove(item.id)}
            >
              ลบหมวดหมู่
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
