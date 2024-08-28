import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Spinner from "../components/Spinner";
import TopNavBar from "../components/TopNavBar";

const ShowItem = () => {
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
    <div className="p-6 px-4 mt-10 md:px-8 max-w-screen-md mx-auto">
      <TopNavBar managerName='Amandi Gunarathne |'/>
      <div className="flex items-center mb-4">
        <Link
          to="/InventoryHome"
          className="flex items-center text-red-600 hover:text-red-800 focus:outline-none"
        >
          <HiOutlineArrowLeft className="text-xl mr-2" />
          Back
        </Link>
        <h1 className="text-3xl font-semibold ml-auto mr-auto">Show Item</h1>
      </div>
      <div className="pb-4"></div> {/* Space */}
      <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex">
            <div className="w-1/3 pr-8">
              <div className="text-xs text-gray-600 font-semibold">
                Created Time:
              </div>
              <div className="text-xs mt-2">
                {new Date(stocks.createdAt).toString()}
              </div>
              <div className="text-xs text-gray-600 font-semibold">
                Last Update Time:
              </div>
              <div className="text-xs mt-2">
                {new Date(stocks.updatedAt).toString()}
              </div>
              <div className="text-xs text-gray-600 font-semibold">Image:</div>
              {stocks.image && (
                <img
                  src={stocks.image}
                  alt="item"
                  className="max-w-full mt-2"
                />
              )}
            </div>
            <div className="w-2/3 pl-8">
              <div className="grid grid-cols-2 gap-y-4">
                <div className="text-lg text-gray-600 font-semibold">
                  Item ID:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.itemID}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Item Name:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.itemName}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Quantity:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.quantity}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Unit Price:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.unitPrice}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Supplier Name:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.supplierName}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Category:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.category}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Employee ID:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.employeeID}
                  readOnly
                />
                <div className="text-lg text-gray-600 font-semibold">
                  Item Weight:
                </div>
                <input
                  type="text"
                  className="text-lg bg-white border border-gray-300 rounded-lg px-3 py-2"
                  value={stocks.itemWeight}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowItem;
