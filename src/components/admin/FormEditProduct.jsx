import React, { useEffect, useState } from "react";
import useClickbuyStore from "../../store/clickbuy-store";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/Product";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  title: "Core i7",
  description: "desc",
  price: 200,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useClickbuyStore((state) => state.token);
  const getCategory = useClickbuyStore((state) => state.getCategory);
  const categories = useClickbuyStore((state) => state.categories);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res.data);
    } catch (err) {
      console.log("err fetch data", err);
    }
  };
  console.log(form);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ`);
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-300 shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.title}
          onChange={handleOnChange}
          placeholder="ชื่อสินค้า"
          name="title"
        />
        <input
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.description}
          onChange={handleOnChange}
          placeholder="รายละเอียดสินค้า"
          name="description"
        />
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.price}
          onChange={handleOnChange}
          placeholder="ราคา"
          name="price"
        />
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="จำนวนสินค้า"
          name="quantity"
        />
        <select
          className="border border-gray-300 rounded-md p-2 m-2"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value={0}>โปรดเลือกหมวดหมู่</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ToastContainer />;
        <hr />
        <Uploadfile form={form} setForm={setForm} />
        <button className="bg-orange-500 rounded-md p-2 m-2">
          แก้ไขสินค้า
        </button>
        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
