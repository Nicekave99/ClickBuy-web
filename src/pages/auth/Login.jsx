import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useClickbuyStore from "../../store/clickbuy-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useClickbuyStore((state) => state.actionLogin);
  const user = useClickbuyStore((state) => state.user);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.Payload.role;
      roleRedirect(role);
      toast.success("ล็อคอินสำเร็จ !!");
      navigate("/");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex h-screen bg-gray-300 ">
      <div className="w-full max-w-xl m-auto bg-indigo-100 rounded-xl p-5">
        <header>
          <img
            className="w-36 mx-auto mb-5 rounded-full"
            src="https://scontent.fbkk30-1.fna.fbcdn.net/v/t39.30808-6/468650538_1612333143032225_3757418526384996837_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mnDt_UFHYXQQ7kNvgHC27SH&_nc_zt=23&_nc_ht=scontent.fbkk30-1.fna&_nc_gid=AD_8BdGBbG73bH8CjLWncMR&oh=00_AYAM1lPCNxQqXRmpAypK_ZgGBmamCPErpBlxDqHYpp7HUA&oe=675475DA"
          />
        </header>
        <h1 className="text-center text-2xl mb-5 font-mono  text-indigo-800">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500">Email</label>
            <input
              placeholder="Email"
              className="w-full p-2  text-indigo-700 border-b-2 border-indigo-500 outline-none  focus:ring-2
             focus:ring-blue-500"
              onChange={handleOnChange}
              name="email"
              type="email"
            />
          </div>
          <div>
            <label class="block mb-2 text-indigo-500">Password</label>
            <input
              placeholder="Password"
              className="w-full p-2  text-indigo-700 border-b-2 border-indigo-500 outline-none  focus:ring-2
             focus:ring-blue-500"
              onChange={handleOnChange}
              name="password"
              type="password"
            />
            <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mt-6 rounded">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
