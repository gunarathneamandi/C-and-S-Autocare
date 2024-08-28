import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import SideNav from "../components/SideNavE";
import { formatDate } from "../Utils/DateUtils";
import TopNavBar from "../components/TopNavBar";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

export const LeaveEmployee = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [rejectedLeaves, setRejectedLeaves] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleApprove = (leaveId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this leave request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085e8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5555/leaves/approve/${leaveId}`)
          .then(() => {
            enqueueSnackbar("Employee Leave Request Approved Successfully!!", {
              variant: "success",
            });

            setLeaves((prevLeaves) =>
              prevLeaves.filter((leave) => leave._id !== leaveId)
            );
          })
          .catch((error) => {
            console.error("Error approving leave:", error);
            enqueueSnackbar("Failed Something went wrong", {
              variant: "error",
            });
          });
      }
    });
  };

  const handleReject = (leaveId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this leave request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5555/leaves/reject/${leaveId}`)
          .then(() => {
            enqueueSnackbar("Employee Leave Request Rejected Successfully!!", {
              variant: "success",
            });

            setLeaves((prevLeaves) =>
              prevLeaves.filter((leave) => leave._id !== leaveId)
            );
          })
          .catch((error) => {
            console.error("Error rejecting leave:", error);
            enqueueSnackbar("Failed Something went wrong", {
              variant: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/leaves")
      .then((response) => {
        const allLeaves = response.data.data;
        const total = allLeaves.length;
        const approved = allLeaves.filter(
          (leave) => leave.status === "Approved"
        ).length;
        const rejected = allLeaves.filter(
          (leave) => leave.status === "Rejected"
        ).length;
        const pending = allLeaves.filter(
          (leave) => leave.status === "Pending"
        ).length;

        setTotalLeaves(total);
        setApprovedLeaves(approved);
        setRejectedLeaves(rejected);
        setPendingLeaves(pending);

        const filteredLeaves = allLeaves.filter(
          (leave) => leave.status !== "Approved"
        );
        setLeaves(filteredLeaves);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 flex">
      <TopNavBar managerName="Mihiran Nanayakkara" />
      <SideNav isOpen={isOpen} toggleNav={toggleNav} />

      <div className="flex-1">
        <div className="flex justify-between mt-20 p-2 mb-16">
          <h1 className="uppercase font-medium text-3xl mb-0">
            Employee Leaves
          </h1>
        </div>
        <div className="container items-center px-4 mb-8">
          <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
            <div class="w-full p-2 xl:w-1/4 sm:w-1/2">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                  <div className="flex mr-4">
                    <span className="items-center px-4 py-4 m-auto bg-blue-200 rounded-full hover:bg-blue-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="items-center w-8 h-8 m-auto text-blue-500 hover:text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-xl font-medium text-gray-600">
                      {totalLeaves}
                    </div>
                    <div className="text-sm text-gray-400 sm:text-base">
                      Total Leave Employee Request
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-px">
                  <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    <div
                      className="h-2 bg-blue-500 rounded-md hover:bg-blue-600"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                  <div className="flex mr-4">
                    <span className="items-center px-4 py-4 m-auto bg-green-500 rounded-full hover:bg-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" id="mainIconPathAttribute" fill="#ffffff"></path> </svg>
                    </span>
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-xl font-medium text-gray-600">
                      {approvedLeaves}
                    </div>
                    <div className="text-sm text-gray-400 sm:text-base">
                      Approved Leave Requests
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-px">
                  <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    <div
                      className="h-2 bg-green-500 rounded-md hover:bg-green-400"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                  <div className="flex mr-4">
                    <span className="items-center px-4 py-4 mt-3 mb-2 m-auto bg-red-500 rounded-full hover:bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  class="bi bi-x-circle" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" id="mainIconPathAttribute" fill="#ffffff"></path> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#ffffff"></path> </svg>

                    </span>
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-xl font-medium text-gray-600">
                      {rejectedLeaves}
                    </div>
                    <div className="text-sm text-gray-400 sm:text-base">
                      Rejected Leave Requests
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-px">
                  <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    <div
                      className="h-2 bg-red-500 rounded-md hover:bg-red-600"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                  <div className="flex mr-4">
                    <span className="items-center px-4 py-4 m-auto bg-yellow-500 rounded-full hover:bg-yellow-300">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

                    </span>
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-xl font-medium text-gray-600">
                      {pendingLeaves}
                    </div>
                    <div className="text-sm text-gray-400 sm:text-base">
                      Pending Leave Employee Requests
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-px">
                  <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    <div
                      className="h-2 bg-yellow-500 rounded-md hover:bg-yellow-600"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Employee Id
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Name
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200 max-md:hidden">
                  Leave Type
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Leave From
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Leave To
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Reason{" "}
                </th>

                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave._id} className="h-8">
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {leave.employeeId.employeeIdNum}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {leave.employeeId.firstName} {leave.employeeId.lastName}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center max-md:hidden">
                    {leave.leaveType}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center max-md:hidden">
                    {formatDate(leave.leaveFrom)}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center max-md:hidden">
                    {formatDate(leave.leaveTo)}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center max-md:hidden">
                    {leave.leaveReason}
                  </td>

                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    <div className="flex justify-center gap-x-4">
                      <button
                        className="h-10 max-h-[40px] w-24 rounded-lg text-center align-middle font-sans text-s font-medium text-white hover:bg-blue-800 bg-blue-950 "
                        type="button"
                        onClick={() => handleApprove(leave._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="h-10 max-h-[40px] w-24 rounded-lg text-center align-middle font-sans text-s font-medium text-white hover:bg-red-500 bg-red-700 "
                        type="button"
                        onClick={() => handleReject(leave._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveEmployee;
