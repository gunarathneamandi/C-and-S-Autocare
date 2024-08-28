import React from "react";

function Navbar() {
  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 h-screen bg-white text-gray-700 w-1/5 p-4 shadow-md overflow-y-auto">
        <ul className="space-y-2 mt-20">
          {" "}
          <li>
            <a
              href="#"
              className="block text-sm hover:text-gray-900 flex items-center"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm hover:text-gray-900 flex items-center"
            >
              Edit Inventory
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm hover:text-gray-900 flex items-center"
            >
              Add Item
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm hover:text-gray-900 flex items-center"
            >
              Report
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
