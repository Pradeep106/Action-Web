import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.loginVar);
  console.log("login nav", isLoggedIn);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className=" bg-gray-900 w-[100%]">
      <div className="w-[90%] text-lg text-white font-semibold mx-auto flex justify-between py-5">
        <h1>Bids Brider</h1>
        <ul className="flex gap-5">
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
        </ul>
        <h2>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login" className="cursor-pointer">
              login
            </Link>
          )}
        </h2>
        <Link to="/profile/" className="cursor-pointer">
          {isLoggedIn && (
            <div className="w-10 h-10 rounded-full">
              <FaUserCircle className="text-gray-400 w-[100%] h-[100%]" />
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
