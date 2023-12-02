import React, { useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const Signup = () => {
  const [hide, setHide] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const passwordHandler = () => {
    setHide(!hide);
    setPasswordType(hide ? "text" : "password");
  };

  const changeInputHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/signup",
        formData
      );
      console.log("Signup successful");
      console.log("Response data:", response.data);
      setFormData({ name: "", email: "", password: "" });

      //toast
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center">
      <div className="w-1/3 mx-auto bg-gray-900 p-5">
        <form className="flex flex-col gap-2" onSubmit={submitHandler}>
          <input
            className="bg-[#040A1B] py-3 px-5 rounded-md outline-none text-gray-400"
            type="text"
            placeholder="Enter Name"
            name="userName"
            value={formData.userName}
            onChange={changeInputHandler}
          />
          <input
            className="bg-[#040A1B] py-3 px-5 rounded-md outline-none text-gray-400"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={changeInputHandler}
          />
          <div className="flex items-center bg-[#040A1B] justify-between">
            <input
              className="bg-[#040A1B] py-3 px-5 w-[90%] rounded-md outline-none text-gray-400"
              type={passwordType}
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={changeInputHandler}
            />
            <div onClick={passwordHandler} className="px-5 cursor-pointer">
              {hide ? (
                <BiSolidHide className="text-gray-400" />
              ) : (
                <BiSolidShow className="text-gray-400" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-[100%] text-black font-400 py-2 px-4 mt-5 rounded-md bg-blue-400 hover:bg-blue-500">
            Signup
          </button>
          <div className="flex justify-center mt-5">
            <Link
              to="/login"
              className="text-blue-600 text-center hover:underline cursor-pointer w-fit">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
