import React, { useState } from "react";
import BackButton from "../components/BackButtonI";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteItem = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/stocks/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Item deleted successfully!", { variant: "success" });
        navigate("/InventoryHome");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting item!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4 relative">
      <BackButton className="absolute top-0 left-0 bg-red-500" />
      <div className="flex justify-center items-center h-screen">
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center rounded-lg shadow-md p-8 max-w-lg bg-white">
          <h3 className="text-2xl mb-8">
            Are you sure you want to delete this item?
          </h3>
          <button
            className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDeleteItem}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete It"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
