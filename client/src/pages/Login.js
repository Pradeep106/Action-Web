import React, { useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

const Login = () => {
  // State for showing/hiding the password
  const [hide, setHide] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  // State to store form data (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to toggle password visibility
  const passwordHandler = () => {
    setHide(!hide);
    setPasswordType(hide ? "text" : "password");
  };

  // Function to handle input changes
  const changeInputHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the authentication endpoint
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        formData
      );
      console.log("Login successful");

      // If a token is received in the response, store it in localStorage

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log("response token", response.data.token);

      // Show a success notification using Toastify
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
      window.location.reload();
      // Navigate to the home page or another route
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-800 h-screen flex items-center">
        <div className="w-1/3 mx-auto bg-gray-900 p-5">
          <form className="flex flex-col gap-2" onSubmit={submitHandler}>
            {/* Email input */}
            <input
              className="bg-[#040A1B] py-3 px-5 rounded-md outline-none text-gray-400"
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              value={formData.email}
              onChange={changeInputHandler}
            />

            {/* Password input with show/hide toggle */}
            <div className="flex items-center bg-[#040A1B] justify-between">
              <input
                className="bg-[#040A1B] py-3 px-5 w-[90%] rounded-md outline-none text-gray-400"
                type={passwordType}
                placeholder="Enter Password"
                name="password"
                required
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

            {/* Login button */}
            <button
              type="submit"
              className="w-[100%] text-black font-400 py-2 px-4 mt-5 rounded-md bg-blue-400 hover:bg-blue-500">
              Login
            </button>

            {/* Link to the signup page */}
            <div className="flex justify-center mt-5">
              <Link
                to="/signup"
                className="text-blue-600 text-center hover:underline cursor-pointer w-fit">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
