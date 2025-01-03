import React, { useEffect, useState } from "react";
import useClickbuyStore from "../../store/clickbuy-store";
import { ToastContainer, toast } from "react-toastify";
import { createProduct, deleteProduct } from "../../api/Product";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useClickbuyStore((state) => state.token);
  const getCategory = useClickbuyStore((state) => state.getCategory);
  const categories = useClickbuyStore((state) => state.categories);
  const getProduct = useClickbuyStore((state) => state.getProduct);
  const products = useClickbuyStore((state) => state.products);

  const [form, setForm] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState); // รีเซ็ตฟอร์มทั้งหมด
      setForm((prevForm) => ({
        ...initialState, // รีเซ็ตข้อมูลฟอร์ม
        images: [], // รีเซ็ตค่า images เป็น array ว่าง
      }));
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบข้อมูลหรือไม่")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("Deleted สินค้าเรียบร้อย!");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Logic to get current items based on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page function should not trigger form submission
  const paginate = (pageNumber, e) => {
    e.preventDefault(); // Prevent form submission
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
        <br />
        <textarea
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.description}
          onChange={handleOnChange}
          placeholder="รายละเอียดสินค้า"
          name="description"
          rows="10"
        />
        <br /> ราคา:
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.price}
          onChange={handleOnChange}
          placeholder="ราคา"
          name="price"
        />
        จำนวนสินค้า
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2 m-2"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="จำนวนสินค้า"
          name="quantity"
        />
        <br />
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
        <hr />
        <Uploadfile form={form} setForm={setForm} />
        <button className="bg-orange-500 rounded-md p-2 m-2">
          เพิ่มสินค้า
        </button>
        <hr />
        <br />
        <table className="table w-full border border-gray-950">
          <thead>
            <tr className="bg-gray-600 text-white border border-gray-950">
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียดสินค้า</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวนสินค้า</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัปเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-lg shadow-md "
                        src={item.images[0].url}
                      />
                    ) : (
                      <div
                        className="w-24 h-24 bg-gray-200 rounded-md 
                                                    flex items-center justify-center shadow-sm"
                      >
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{numberFormat(item.price)}</td>
                  <td>{numberFormat(item.quantity)}</td>
                  <td>{item.sold}</td>
                  <td>{dateFormat(item.updatedAt)}</td>
                  <td className="flex gap-2">
                    <p
                      className="bg-yellow-500 rounded-md p-1 
                                            hover:scale-105 hover:-translate-y-1 hover:duration-200
                                            shadow-md"
                    >
                      <Link to={"/admin/product/" + item.id}>
                        <Pencil />
                      </Link>
                    </p>
                    <p
                      className="bg-red-500 rounded-md p-1 hover:scale-105
                      hover:-translate-y-1 hover:duration-200 shadow-md"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={(e) => paginate(currentPage - 1, e)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={(e) => paginate(currentPage + 1, e)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormProduct;
