import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);

  const url = `http://localhost:4000/api/v1/user/profile`;
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("url");
      const response = await axios.get(url);
      console.log(response?.data);
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching data");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [count]);

  let email = data && data.user ? data.user.email : "name not found";
  email = email.split("@");

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      let image = data.image[0];
      const { title, description, startingBid, targetDate } = data;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startingBid", startingBid);
      formData.append("image", image);
      formData.append("targetDate", targetDate);
      console.log(formData);
      const token = localStorage.getItem("token");
      console.log("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        "http://localhost:4000/api/v1/product/create",
        formData
      );

      if (response.status === 200) {
        // Redirect to the next step (Podcast Audio form)
        setCount(count + 1);
        alert("success");
      } else {
        console.error(
          "Server responded with a non-OK status code:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting the podcast data:",
        error
      );
      // Handle the error gracefully, show a message to the user, etc.
    }
  };

  return (
    <div className="bg-[#D5E9F6] h-full overflow-x-hidden w-[100%]">
      <div className="w-[100%] text-white text-lg font-bold p-5 bg-gray-900">
        Profile
      </div>
      <div className="flex flex-wrap pt-14 justify-around ">
        <div className="w-[200px]  bg-white rounded-md flex flex-col items-center mt-10 p-5 border-red-400 h-fit">
          <img
            className="w-[100px] h-[100px] rounded-full"
            src="https://igimages.gumlet.io/telugu/gallery/actor/brahmanandam/Dochey210415_008.jpg?w=376&dpr=2.6"
            alt=""
          />
          <h1 className="text-xl font-bold mt-3">{email[0]}</h1>
        </div>

        <div>
          <h1 className="text-xl font-bold p-5">Upload Auction</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-[60vw] bg-white p-5">
            <input
              className="bg-[#D5E9F6] outline-none  text-gray-600 rounded-lg p-2"
              type="text"
              placeholder="Title"
              {...register("title")}
              required
            />

            <input
              className="bg-[#D5E9F6] outline-none  text-gray-700 rounded-lg p-2"
              type="text"
              placeholder="Description"
              {...register("description")}
              required
            />
            <input
              className="bg-[#D5E9F6] outline-none  text-gray-600 rounded-lg p-2"
              type="number"
              placeholder="Starting bid amount"
              {...register("startingBid")}
              required
            />
            <input
              className="bg-gray-700 outline-none  text-gray-600 rounded-lg p-2"
              type="file"
              placeholder="image"
              {...register("image")}
              required
            />
            <input
              type="date"
              className="bg-[#D5E9F6] outline-none  text-gray-500 rounded-lg p-2"
              placeholder="Select bid end date"
              {...register("targetDate")}
              required
            />

            <button
              type="submit"
              className="bg-gray-700 px-3 w-full py-2 rounded-md text-white">
              upload
            </button>
          </form>
        </div>
      </div>
      <h1 className="text-xl font-bold mt-10  text-center p-5">
        Upload Auction
      </h1>
      <div className="flex justify-center gap-5 flex-wrap">
        {data &&
          data.user &&
          data.user.products.map((item) => {
            return <Card key={item.index} data={item} />;
          })}
      </div>
    </div>
  );
};

export default Profile;
