import axios from "axios";

// URL หลักของ Backend API ที่โฮสต์บน Vercel
const BASE_URL = "https://clickbuy-api.vercel.app/api/filters";

// ฟังก์ชันสำหรับดึงข้อมูล Filters ทั้งหมด
export const getFilters = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

// ฟังก์ชันสำหรับสร้าง Filter ใหม่
export const createFilter = async (filterData) => {
  const response = await axios.post(`${BASE_URL}`, filterData);
  return response.data;
};

// ฟังก์ชันสำหรับอัปเดต Filter ที่มีอยู่
export const updateFilter = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

// ฟังก์ชันสำหรับลบ Filter
export const deleteFilter = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
