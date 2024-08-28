import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Navbar from "../components/NavBar";
import TopNavBar from "../components/TopNavBar";
//import "font-awesome/css/font-awesome.min.css";

const EditItem = () => {
  const [itemID, setId] = useState("");
  const [itemName, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setPrice] = useState("");
  const [supplierName, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [employeeID, setEmployee] = useState("");
  const [extraQuantity, setExtraQuantity] = useState(""); // New state for extra quantity
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/stocks/${id}`)
      .then((response) => {
        console.log("Response Data:", response.data);

        const data = response.data.stock;
        setId(data.itemID || "");
        setName(data.itemName || "");
        setQuantity(data.quantity || "");
        setPrice(data.unitPrice || "");
        setSupplier(data.supplierName || "");
        setCategory(data.category || "");
        setEmployee(data.employeeID || "");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [id]);

  const handleEditItem = () => {
    const newQuantity = parseInt(quantity) + parseInt(extraQuantity); // Calculate new total quantity
    const data = {
      itemID,
      itemName,
      quantity: newQuantity, // Update quantity with new total quantity
      unitPrice,
      supplierName,
      category,
      employeeID,
    };
    setLoading(true);

    axios({
      method: "put",
      url: `http://localhost:5555/stocks/${id}`,
      data: data,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Item updated successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);

        if (error.response) {
          alert(
            `Server responded with ${error.response.status}: ${error.response.data.message}`
          );
          console.log("Server Response:", error.response.data);
        } else if (error.request) {
          alert("No response received. Please check your network connection.");
          console.error("Network Error:", error.request);
        } else {
          alert("An error occurred. Please check console for details.");
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="p-4 flex flex-col md:flex-row">
      <TopNavBar />
      <div className="w-full md:w-1/3">
        <Navbar />
      </div>

      <div className="w-full md:w-2/3 mt-4 md:mt-0 ">
        <div className="flex justify-between items-center mb-4 mt-19">
          <h1 className="text-3xl font-bold">Edit Item</h1> <BackButton />
        </div>
        {loading ? <Spinner /> : ""}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg mr-4"></div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-600">itemID</label>
                <input
                  type="text"
                  value={itemID}
                  onChange={(e) => setId(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">itemName</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">quantity</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">unitPrice</label>
                <input
                  type="text"
                  value={unitPrice}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">supplierName</label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">employeeID</label>
                <input
                  type="text"
                  value={employeeID}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Extra Quantity</label>
                <input
                  type="text"
                  value={extraQuantity}
                  onChange={(e) => setExtraQuantity(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
            </div>
            <button
              onClick={handleEditItem}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 shadow"
            >
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
