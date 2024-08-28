import React, { useState } from "react";
import BackButton from "../components/BackButtonI";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Navbar from "../components/NavBar";
import TopNavBar from "../components/TopNavBar";
//import "font-awesome/css/font-awesome.min.css";

const CreateItem = () => {
  const [itemID, setId] = useState("");
  const [itemName, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setPrice] = useState("");
  const [supplierName, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [employeeID, setEmployee] = useState("");
  const [itemWeight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveItem = () => {
    setLoading(true);
    const data = {
      itemID,
      itemName,
      quantity,
      unitPrice,
      supplierName,
      category,
      employeeID,
      itemWeight,
      image,
    };

    axios
      .post("http://localhost:5555/stocks", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Item created successfully!", { variant: "success" });
        navigate("/InventoryHome");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error creating item!", { variant: "error" });
        console.log(error);
      });
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const validateNumber = (value, setError) => {
    if (!value || isNaN(value)) {
      setError("Please enter a valid number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (!validateNumber(e.target.value, setQuantityError)) {
      setQuantityError("Please enter a valid quantity.");
    } else {
      setQuantityError("");
    }
  };

  const handleUnitPriceChange = (e) => {
    setPrice(e.target.value);
    if (!validateNumber(e.target.value, setUnitPriceError)) {
      setUnitPriceError("Please enter a valid unit price.");
    } else {
      setUnitPriceError("");
    }
  };

  return (
    <div className="p-4 flex flex-col md:flex-row">
      <TopNavBar managerName='Amandi Gunarathne |'/>
      <div className="w-full md:w-1/3">
        <Navbar />
      </div>

      <div className="w-full md:w-2/3 mt-4 md:mt-0 ">
        <div className="flex justify-between items-center mb-4 mt-19">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className="text-3xl font-bold">New Item</h1> <BackButton />
        </div>
        {loading ? <Spinner /> : ""}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg mr-4">
            <label className="block mb-2 text-gray-600">Upload Image</label>
            <input
              type="file"
              onChange={convertToBase64}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-600">Item ID</label>
                <input
                  type="text"
                  value={itemID}
                  onChange={(e) => setId(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Quantity</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
                {quantityError && (
                  <p className="text-red-500">{quantityError}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Unit Price</label>
                <input
                  type="text"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
                {unitPriceError && (
                  <p className="text-red-500">{unitPriceError}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-600">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Employee ID</label>
                <input
                  type="text"
                  value={employeeID}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600">Item Weight</label>
                <input
                  type="text"
                  value={itemWeight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-full rounded"
                />
              </div>
            </div>
            <button
              onClick={handleSaveItem}
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

export default CreateItem;
