import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

const LeaveFormEmployee = ({ onClose }) => {
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [inchargename,setInchargeName] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const handleLeaveRequest = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5555/leaves",
        {
          leaveFrom,
          leaveTo,
          leaveType,
          leaveReason,
          inchargename,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      enqueueSnackbar("Leave Request Successful!", { variant: "success" });
      navigate("/employee/profile", { replace: true });
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar("Failed to request leave", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray bg-opacity-75 flex items-center justify-center backdrop-blur">
      <div className="p-4 ">
        <h1 className=" uppercase text-blue-950 text-xl pl-44 ml-24 font-bold my-6 mt-24">
          Employee Leave Request Form
        </h1>

        <div className="border-2 bg-blue-50 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLeaveRequest();
              }}
            >
              <div className="mt-10 flex flex-col gap-4 ml-14">
                <label className="mr-2 text-lg font-medium text-blue-950">
                  Leave Type <span className="text-red-500">*</span>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    required
                    className="ml-8 mt-1 border-2 px-4 py-2 w-200 rounded-md focus:outline-none focus:ring"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </label>
                <label className="mr-1 text-lg font-medium text-blue-950">
                  Leave From <span className="text-red-500">*</span>
                  <input
                    type="date"
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    required
                    className="ml-8 mt-1 border-2 px-4 py-2 w-200 rounded-md  focus:outline-none focus:ring"
                    min={today}
                  />
                </label>
                <label className="mr-1 text-lg font-medium text-blue-950">
                  Leave To <span className="text-red-500">*</span>
                  <input
                    type="date"
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                    required
                    className="ml-14 mt-1 border-2 px-4 py-2 w-200 rounded-md  focus:outline-none focus:ring"
                    min={leaveFrom}
                  />
                </label>
                <label className="mr-1 text-lg font-medium text-blue-950">
                  Incharge Name <span className="text-red-500">*</span>
                  <input
                    type="text"
                    value={inchargename}
                    onChange={(e) => setInchargeName(e.target.value)}
                    required
                    className="ml-2 mt-1 border-2 px-4 py-2 w-200 rounded-md  focus:outline-none focus:ring"
                  />
                </label>
                <label className="mr-1 text-lg font-medium text-blue-950">
                  Leave Reason
                </label>
                <div className="ml-20 w-100">
                <textarea
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="ml-14 mt-1 border-2 px-4 py-2 w-50 rounded-md focus:outline-none focus:ring"
                  rows="3" 
                />

                </div>
                
                <div className="flex items-center justify-center space-x-4 mt-10 mb-5">
                  <button
                    className="p-2 w-1/2 rounded-md text-lg text-white font-medium bg-blue-950 hover:bg-blue-600"
                    type="submit"
                    disabled={loading}
                  >
                    Request Leave
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/4 bg-gray-900 text-white text-lg font-medium py-2 rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveFormEmployee;
