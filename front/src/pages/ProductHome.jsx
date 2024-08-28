import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import UserTopNav from "../components/TopNav";
import Footer from "../components/Footer";

const ProductHome = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState(""); // State to store user token
  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
    // Retrieve token from wherever it's stored (e.g., local storage)
    const userToken = localStorage.getItem("token");
    console.log(token);
    setToken(userToken);

    setLoading(true);
    axios
      .get("http://localhost:5555/stocks")
      .then((response) => {
        setStocks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (stockId) => {
    // Check if user is logged in
    if (!token) {
      alert("Please login to add items to cart.");
      navigate("/login"); // Redirect to login page
      return;
    }

    const selectedStock = stocks.find((stock) => stock._id === stockId);
    const cartItemData = {
      image: selectedStock.image,
      name: selectedStock.itemName,
      amount: selectedStock.unitPrice,
      quantity: 1,
      total: selectedStock.price,
    };

    axios
      .post("http://localhost:5555/api/cart", cartItemData, {
        headers: { Authorization: token },
      })
      .then((res) => {
        alert("Item added to cart successfully!");
        console.log(res.data);
        // Redirect to cart page
        navigate("/productHome");
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart. Please try again later.");
      });
  };

  return (
    <div>
      <UserTopNav />
      <div className="p-6 px-4 mt-10 md:px-8 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-8 mt-30">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md p-2 pl-8 focus:border-blue focus:outline-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {stocks
              .filter((item) =>
                ["itemName", "supplierName", "category"].some((key) =>
                  item[key].toLowerCase().includes(query.toLowerCase())
                )
              )
              .map((stock) => (
                <div
                  key={stock._id}
                  className="border rounded-lg p-4 flex flex-col justify-between shadow-md"
                >
                  <div className="aspect-w-1 aspect-h-1 border border-gray-300 rounded-lg overflow-hidden">
                    {stock.image && (
                      <img
                        src={stock.image}
                        alt="item"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex justify-between mb-2">
                    <h2 className="font-bold text-lg">{stock.itemName}</h2>
                  </div>
                  <p>Price: Rs.{stock.unitPrice}.00</p>
                  <div className="flex justify-center space-x-4 mt-auto">
                    <Link to={`/view/${stock._id}`}>
                      <button className="bg-white border border-blue-950 text-black hover:bg-blue-950 hover:text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                        Details
                      </button>
                    </Link>
                    <button
                      className="bg-blue-950 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleAddToCart(stock._id)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductHome;
