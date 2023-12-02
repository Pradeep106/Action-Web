import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import axios from "axios";
import DetailsProduct from "./DetailsProduct";

const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/product/getproduct"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while fetching data");
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="bg-[#D5E9F6] h-full overflow-x-hidden">
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-1 mt-5 justify-center mx-auto">
          {data.product.map((item) => {
            return<Card key={item.index} data={item} />;
          })}
        </div> 
      )}
    </div>
  );
};

export default Home;
