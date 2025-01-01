import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ใช้ไอคอนจาก react-icons

const registerSchema = z
  .object({
    email: z.string().email({ message: "ใส่อีเมลให้ถูกต้อง ไอ้น้อง!!!" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // สถานะสำหรับเปิด/ปิด Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // สำหรับ confirm password

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  // คงฟังก์ชันเก่าของคุณไว้
  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score;
    if (passwordScore < 3) {
      toast.warning("Password มันกระจอกไป");
      return;
    }
    try {
      const res = await axios.post(
        "https://clickbuy-api.vercel.app/api/register",
        data
      );

      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-300">
      <div className="w-full max-w-xl m-auto bg-indigo-100 rounded-xl p-5">
        <h1 className="text-center text-2xl mb-5 font-mono text-indigo-800">
          สมัครสมาชิก
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-indigo-500">Email</label>
            <input
              {...register("email")}
              placeholder="Email"
              className={`w-full p-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email && "border-red-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 text-indigo-500">Password</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password && "border-red-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Password Strength */}
          {watch().password?.length > 0 && (
            <div className="flex mt-2">
              {Array.from(Array(5).keys()).map((item, index) => (
                <span className="w-1/5 px-1" key={index}>
                  <div
                    className={`rounded-full h-2 ${
                      passwordScore <= 2
                        ? "bg-red-500"
                        : passwordScore < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                </span>
              ))}
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-2 text-indigo-500">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`w-full p-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword && "border-red-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className="w-full mt-6 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
