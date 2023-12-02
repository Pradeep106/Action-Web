import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home";
import DetailsProduct from "./pages/DetailsProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./Redux/features/isLoggedIn";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import RealTimeChat from "./pages/RealTimeChat";
import Chat from "./pages/Chat";

function App() {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.isLoggedIn.loginVar);
  console.log("flag", flag);

  useEffect(() => {
    // Check for the presence of the token
    const token = localStorage.getItem("token");
    if (token) {
      // You can verify the token on the server to ensure its validity
      // If valid, set isAuthenticated to true
      // setIsAuthenticated(true);
      dispatch(checkLogin(true));
    }
    console.log("token", token);
  }, []);
  console.log("flag", flag);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetails/:id" element={<DetailsProduct />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/chat" element={<RealTimeChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
