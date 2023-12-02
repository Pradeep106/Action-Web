import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="border-2  bg-[#EFF4F8] w-[200px] p-2 rounded">
      <img className="w-[100%] h-[200px]" src={data.image} alt="" />
      <h1 className="font-bold">{data.title}</h1>
      <p className="font-semibold">${data.startingBid}</p>
      <button className="mt-2 bg-orange-500 rounded px-3 py-1 text-white">
        <Link to={`/productDetails/${data._id}`}> JOIN BID</Link>
      </button>
    </div>
  );
};

export default Card;
