import React, { useState, useEffect } from "react";
import BackButton from "../components/BackBtnE";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import TopNavBar from "../components/TopNavBar";

export const EditEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNum, setbankAccountNum] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [workExperiance, setWorkExperiance] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [nicError, setNicError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [bankNameError, setBankNameError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/crud/${id}`)

      .then((response) => {
        setFirstName(response.data.employee.firstName || "");
        setLastName(response.data.employee.lastName || "");
        setNic(response.data.employee.nic || "");
        setRole(response.data.employee.role || "");
        setEmail(response.data.employee.email || "");
        setGender(response.data.employee.gender || "");
        setDob(response.data.employee.dob || "");
        setContactNumber(response.data.employee.contactNumber || "");
        setAddress(response.data.employee.address || "");
        setBankName(response.data.employee.bankName || "");
        setbankAccountNum(response.data.employee.bankAccountNum || "");
        setBranch(response.data.employee.branch || "");
        setQualifications(response.data.employee.qualifications || "");
        setWorkExperiance(response.data.employee.workExperiance || "");

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happend. Please check Console");
        console.log(error);
      });
  }, []);

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);

    // Check if first name contains only letters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setFirstNameError("First Name should contain only letters");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    setLastName(value);

    // Check if last name contains only characters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setLastNameError("Last Name should contain only letters");
    } else {
      setLastNameError("");
    }
  };

  const handleContactNumberChange = (e) => {
    const { value } = e.target;
    setContactNumber(value);

    // Check if contact number contains exactly 10 digits
    if (!/^\d{10}$/.test(value)) {
      setContactNumberError("Contact Number should contain 10 digits");
    } else {
      setContactNumberError("");
    }
  };

  const handleNicChange = (e) => {
    const { value } = e.target;
    setNic(value);

    // Check if NIC contains exactly 12 digits or 9 digits followed by 'v' or 'V'
    if (!/^\d{12}$/.test(value) && !/^\d{9}[vV]$/.test(value)) {
      setNicError("NIC should be 12 digits or 9 digits followed by 'v' or 'V'");
    } else {
      setNicError("");
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Check if email is in the correct format
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setEmailError("Email should be in the format example@domain.com");
    } else {
      setEmailError("");
    }
  };

  const handleDobChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

    setDob(e.target.value);

    // Check if date of birth is at least 18 years old
    if (selectedDate > minAgeDate) {
      setDobError("Date of birth should be at least 18 years ago");
    } else if (selectedDate > currentDate) {
      setDobError("Cannot select a future date");
    } else {
      setDobError("");
    }
  };

  const handleBranchChange = (e) => {
    const { value } = e.target;
    setBranch(value);

    // Check if branch name contains only letters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setBranchError("Branch Name should contain only letters");
    } else {
      setBranchError("");
    }
  };

  const handleBankNameChange = (e) => {
    const { value } = e.target;
    setBankName(value);

    // Check if bank name contains only letters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setBankNameError("Bank Name should contain only letters");
    } else {
      setBankNameError("");
    }
  };

  const handleEditEmployee = () => {
    if (
      !firstName ||
      !lastName ||
      !nic ||
      !role ||
      !email ||
      !gender ||
      !dob ||
      !contactNumber ||
      !bankName ||
      !bankAccountNum ||
      !branch ||
      !address ||
      !qualifications ||
      !workExperiance ||
      firstNameError ||
      lastNameError ||
      nicError ||
      emailError ||
      dobError ||
      contactNumberError ||
      bankNameError ||
      branchError
    ) {
      enqueueSnackbar("Please fill in all required fields correctly.", {
        variant: "error",
      });
      return;
    }

    const data = {
      firstName,
      lastName,
      nic,
      role,
      email,
      gender,
      dob,
      contactNumber,
      address,
      bankName,
      bankAccountNum,
      branch,
      qualifications,
      workExperiance,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/crud/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Employee Details Updated Sucessfully!!", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <TopNavBar
        managerName="Mihiran Nanayakkara"
      />
      <BackButton />
      {loading ? <Spinner /> : ""}
      <center>
        <h1 className="uppercase text-blue-950 text-3xl font-bold my-6 mt-24">
          Update Employee Details Form
        </h1>
      </center>

      <div className="border-2 bg-blue-50 border-sky-400 rounded-xl w-[900px] p-4 mx-auto">
        <label className="text-xl font-bold mr-1 text-black-500 ">
          General Informations
        </label>
        <div>
          <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2">
            <div className="my-4">
              <label className="mr-1 text-lg font-medium text-blue-950">
                First Name
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className={` mt-1 border-2 px-4 py-2 w-full rounded-md ${
                  firstNameError ? "border-red-500" : "border-blue-500"
                } focus:outline-none focus:ring`}
              />
              {firstNameError && (
                <p className="text-red-500 text-sm">{firstNameError}</p>
              )}
            </div>
            <div className="my-4">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Last Name
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                  lastNameError ? "border-red-500" : "border-blue-500"
                } focus:outline-none focus:ring`}
              />
              {lastNameError && (
                <p className="text-red-500 text-sm">{lastNameError}</p>
              )}
            </div>
            <div className="my-4">
              <label className="mr-1 text-lg font-medium text-blue-950">
                NIC
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={nic}
                onChange={handleNicChange}
                className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                  nicError ? "border-red-500" : "border-blue-500"
                } focus:outline-none focus:ring`}
              />
              {nicError && <p className="text-red-500 text-sm">{nicError}</p>}
            </div>
            <div className="my-4">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Email Address
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                  emailError ? "border-red-500" : "border-blue-500"
                } focus:outline-none focus:ring`}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="my-4">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Date of Birth
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="date"
                value={dob.substring(0,10)}
                onChange={handleDobChange}
                className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                  dobError ? "border-red-500" : "border-blue-500"
                } focus:outline-none focus:ring`}
              />
              {dobError && <p className="text-red-500 text-sm">{dobError}</p>}
            </div>
            <div className="my-4">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Contact Number
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="tel"
                value={contactNumber}
                onChange={handleContactNumberChange}
                className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                  contactNumberError ? "border-red-500" : "border-blue-500"
                } focus:outline-none focus:ring`}
              />
              {contactNumberError && (
                <p className="text-red-500 text-sm">{contactNumberError}</p>
              )}
            </div>
            <div className="my-2">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Address
              </label>
              <span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="my-2">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Gender
              </label>
              <span className="text-red-500">*</span>
              <div className="mt-4 ml-3">
                <input
                  type="radio"
                  id="Male"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="Male" className="mr-4 ml-3 text-xl">
                  Male
                </label>

                <input
                  type="radio"
                  id="Female"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="Female" className="ml-3 text-xl">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-5">
            <label className="text-xl font-bold mr-1 text-black-500">
              Bank Informations
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 ">
          <div className="my-2">
            <label className="mr-1 text-lg font-medium text-blue-950">
              Bank Name
            </label>
            <span className="text-red-500">*</span>
            <input
              required
              type="text"
              value={bankName}
              onChange={handleBankNameChange}
              className={`mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md ${
                bankNameError ? "border-red-500" : "dark:focus:border-red-500"
              } focus:outline-none focus:ring`}
            />
            {bankNameError && <p className="text-red-500">{bankNameError}</p>}
          </div>
          <div className="my-2">
            <label className="mr-1 text-lg font-medium text-blue-950">
              Bank Account Number{" "}
            </label>
            <span className="text-red-500">*</span>
            <input
              required
              type="number"
              value={bankAccountNum}
              onChange={(e) => setbankAccountNum(e.target.value)}
              className="mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="my-2">
            <label className="mr-1 text-lg font-medium text-blue-950">
              Branch
            </label>
            <span className="text-red-500">*</span>
            <input
              required
              type="text"
              value={branch}
              onChange={handleBranchChange}
              className={`mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md ${
                branchError ? "border-red-500" : "dark:focus:border-red-500"
              } focus:outline-none focus:ring`}
            />
            {branchError && <p className="text-red-500">{branchError}</p>}
          </div>
        </div>
        <div className="mt-10 mb-5">
          <label className="text-xl font-bold mr-1 text-black-500 ">
            Work Informations
          </label>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 ">
          <div className="my-2">
            <label className="mr-1 text-lg font-medium text-blue-950">
              Qualifications
            </label>
            <span className="text-red-500">*</span>
            <textarea
              required
              type="text"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              className="mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="my-2">
            <label className="mr-1 text-lg font-medium text-blue-950">
              Job Role
            </label>
            <span className="text-red-500">*</span>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
            >
              <option value="">Select Job role</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Electrician">Electrician</option>
              <option value="Service Technician">Service Technician</option>
              <option value="Painting Technician">Painting Technician</option>
              <option value="Cashier">Cashier</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="my-2">
            <label className="mr-1 text-lg font-medium text-blue-950">
              Work Experiance
            </label>
            <span className="text-red-500">*</span>
            <textarea
              required
              type="text"
              value={workExperiance}
              onChange={(e) => setWorkExperiance(e.target.value)}
              className="mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
            />
          </div>
          <button
            className="p-3 uppercase rounded-md text-xl text-white font-medium shadow-xl bg-blue-950 m-10 hover:bg-blue-800"
            onClick={handleEditEmployee}
            disabled={
              firstNameError ||
              lastNameError ||
              nicError ||
              emailError ||
              dobError ||
              contactNumberError ||
              bankNameError ||
              branchError
            }
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
