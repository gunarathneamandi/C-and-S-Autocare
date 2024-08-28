import React, { useState } from "react";
import BackButton from "../components/BackBtnE";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import TopNavBar from "../components/TopNavBar";

export const CreateEmployee = () => {
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
  const [contactNumberError, setContactNumberError] = useState("");
  const [nicError, setNicError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [bankNameError, setBankNameError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveEmployee = () => {
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
      bankName,
      bankAccountNum,
      branch,
      address,
      qualifications,
      workExperiance,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/crud", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Employee Registerd Successfully!!", {
          variant: "success",
        });
        navigate("/employee/maindash");
      })
      .catch((error) => {
        setLoading(false);

        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);

    // Check if first name contains only characters
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

    if (!/^[0-9]{10}$/.test(value)) {
      setContactNumberError(
        "Contact Number should be a 10-digit number with digits from 0 to 9."
      );
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
  ////


  return (
    <div className="p-4 ">
      <TopNavBar managerName="Mihiran Nanayakkara" />
      <BackButton />
      {loading ? <Spinner /> : ""}
      <div className="max-w-5xl mx-auto bg-gray-50 shadow-md mt-16 rounded-lg py-6 px-8">
        <center>
          <h1 className=" uppercase text-blue-950 text-3xl font-medium my-6">
            Employee Registration Form
          </h1>
        </center>

        <div className="border-2 bg-blue-50 border-sky-400 rounded-xl w-[900px] p-4 mx-auto">
          <label className="text-xl font-bold mr-1 text-black-500 ">
            General Informations
          </label>
          <div>
        <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 ">

              <div className="my-2">
                <label className="mr-1 text-lg font-medium text-blue-950">
                  First Name
                </label>
                <span className="text-red-500">*</span>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                    firstNameError ? "border-red-500" : "border-blue-500"
                  } focus:outline-none focus:ring`}
                />
                {firstNameError && (
                  <p className="text-red-500 text-sm">{firstNameError}</p>
                )}
              </div>
              <div className="my-2">
                <label className="mr-1 text-lg font-medium text-blue-950">
                  Last Name
                </label>
                <span className="text-red-500">*</span>
                <input
                  required
                  type="text"
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
              <div className="my-2">
                <label className="mr-1 text-lg font-medium text-blue-950">
                  National{" "}
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
              <div className="my-2">
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

              <div className="my-2">
                <label className="mr-1 text-lg font-medium text-blue-950">
                  Date of Birth
                </label>
                <span className="text-red-500">*</span>
                <input
                  required
                  type="date"
                  value={dob}
                  onChange={handleDobChange}
                  className={`mt-1 border-2 px-4 py-2 w-full rounded-md ${
                    dobError ? "border-red-500" : "border-blue-500"
                  } focus:outline-none focus:ring`}
                />
                {dobError && <p className="text-red-500 text-sm">{dobError}</p>}
              </div>
              <div className="my-2">
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
                  className=" mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
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
                  <label
                    htmlFor="Male"
                    className="mr-4 ml-3 text-xl text-blue-950"
                  >
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
                  <label
                    htmlFor="Female"
                    className="ml-3 text-xl text-blue-950"
                  >
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
                className={` mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md ${
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
                className=" mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
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
                className={` mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md ${
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
                className=" mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="my-2">
              <label className="mr-1 text-lg font-medium text-blue-950">
                Job Role
              </label>
              <span className="text-red-500">*</span>
              <select
                required
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className=" mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
              >
                <option>Select Job role</option>
                <option>Mechanic</option>
                <option>Electrician</option>
                <option>Service Technician</option>
                <option>Painting Technician</option>
                <option>Cashier</option>
                <option>Manager</option>
              </select>
            </div>
            <div className="my-2">
              <label className=" mr-1 text-lg font-medium text-blue-950">
                Work Experiance
              </label>
              <span className="text-red-500">*</span>
              <textarea
                required
                type="text"
                value={workExperiance}
                onChange={(e) => setWorkExperiance(e.target.value)}
                className=" mt-1 border-2 border-blue-500 px-4 py-2 w-full rounded-md dark:focus:border-red-500 focus:outline-none focus:ring"
              />
            </div>
            <button
              className="p-3 uppercase rounded-md text-xl text-white font-medium shadow-xl bg-blue-950 m-10 hover:bg-blue-800"
              onClick={handleSaveEmployee}
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
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
