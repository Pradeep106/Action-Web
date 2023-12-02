import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import displayRazorpay from "./Payment";
import RealTimeChat from "./RealTimeChat";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../Redux/features/amount";

const DetailsProduct = () => {
  const { id } = useParams();
  const url = `http://localhost:4000/api/v1/product/getproduct/${id}`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidValue, setBidAmount] = useState(0);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const dispatch = useDispatch();
  const price = useSelector((state) => state.amount.price);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setCount(count + 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      setError("Error fetching product details. Please try again.");
      setLoading(false);
    }
  };

  const date = data && data.product && data.product.targetDate;
  const newDate = new Date(date);

  const calculateTimeRemaining = () => {
    if (!data || !data.product || !data.product.targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const now = new Date().getTime();
    const distance = newDate - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining());
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  let maxValue, valuesArray;

  if (!loading) {
    valuesArray = data && data.bid && data.bid.map((obj) => obj.bid);
    maxValue = Math.max(...valuesArray);
  }
  dispatch(setAmount(maxValue));
  console.log("price", maxValue);
  const placeBidHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(url, { bidValue });
      setCount(count + 1);
    } catch (error) {
      console.error("Error placing bid:", error.message);
      setError("Error placing bid. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex w-[100%] overflow-x-hidden flex-wrap justify-around border-2 pt-10 bg-[#D5E9F6]">
        <div className="flex  justify-start flex-col ">
          <div className="bg-white w-fit rounded-md h-fit py-3">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && data.product && (
              <div className="w-fit flex flex-col gap-2">
                <h1 className="font-bold pl-2 text-xl">{data.product.title}</h1>
                <img
                  className="w-[250px] h-[300px]"
                  src={data.product.image}
                  alt="image"
                />
                <p className="font-semibold pl-2">About</p>
                <p className="pl-2 w-[250px]">{data.product.description}</p>
                <button
                  onClick={() => displayRazorpay(maxValue)}
                  className="bg-gray-800 m-2 rounded-md text-white font-semibold text-md px-3 py-2">
                  Buy
                </button>
              </div>
            )}
          </div>
          <RealTimeChat />
        </div>
        <div>
          <h1 className="font-bold text-lg">Bid ends left</h1>
          {loading ? (
            <p>Loading ....</p>
          ) : (
            <div>
              <h1 className="font-semibold">
                <span className="font-semibold">
                  {timeRemaining.days} Days{" "}
                </span>
                <span>{timeRemaining.hours} Hour </span>
                <span>{timeRemaining.minutes} minutes</span>
              </h1>
              <h1>Maximum Bid: {maxValue}</h1>
            </div>
          )}
          <form
            className="bg-white mt-10 p-5 rounded-md  flex flex-col w-[300px]"
            onSubmit={placeBidHandler}>
            <input
              className="bg-[#D5E9F6] px-2 py-2 rounded outline-none text-gray-800"
              type="number"
              placeholder="Enter amount"
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <button
              className="bg-[#111827] mt-3 p-2 rounded text-white"
              type="submit">
              Place bid
            </button>
          </form>
          <table className="bg-[#111827] mt-10 rounded-md">
            <thead>
              <tr className="text-white">
                <th className="p-5">Name</th>
                <th>Bid</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data &&
                data.bid &&
                data.bid
                  .filter(
                    (item) => item && item.bidder && item.bid && item.time
                  )
                  .map((item, index) => (
                    <tr key={index} className=" border-gray-400">
                      <td className="px-5 py-2 border border-gray-400">
                        {item.bidder}{" "}
                      </td>
                      <td className="px-5 py-2 border border-gray-400">
                        {item.bid}
                      </td>
                      <td className="px-5 py-2 border border-gray-400">
                        {new Date(item.time).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-2 border border-gray-400">
                        {new Date(item.time).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
