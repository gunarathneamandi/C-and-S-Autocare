import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Spinner from "../components/Spinner";
import UserTopNav from "../components/TopNav";
import Footer from "../components/Footer";

const ViewProduct = () => {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/stocks/${id}`)
      .then((response) => {
        setStocks(response.data.stock);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <UserTopNav />
      <br />
      <br />
      <div className="my-8 mx-auto max-w-4xl">
        <div className="flex items-center mb-4">
          <Link
            to="/stocks"
            className="flex items-center text-blue-960 hover:text-red-800 focus:outline-none"
          >
            <HiOutlineArrowLeft className="text-xl mr-2" />
          </Link>

          <h1 className="text-4xl font-semibold ml-4">{stocks.itemName}</h1>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex">
              <div className="w-2/5 pr-8">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {stocks.image && (
                    <img
                      src={stocks.image}
                      alt="item"
                      className="w-full h-auto"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </div>
              <div className="w-3/5 pl-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-lg text-gray-600 font-semibold">
                    Item ID:
                  </div>
                  <div className="text-base">{stocks.itemID}</div>
                  <div className="text-lg text-gray-600 font-semibold">
                    Unit Price:
                  </div>
                  <div className="text-base font-bold text-blue-900">
                    Rs.{stocks.unitPrice}.00
                  </div>
                  <div className="text-lg text-gray-600 font-semibold">
                    Supplier Name:
                  </div>
                  <div className="text-base">{stocks.supplierName}</div>
                  <div className="text-lg text-gray-600 font-semibold">
                    Category:
                  </div>
                  <div className="text-base">{stocks.category}</div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-950 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2">
              Add to Cart
            </button>
            <button className="bg-blue-950 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProduct;
