import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import TopNavBar from '../components/TopNavBar';


const Cusdetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/users')
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="min-h-screen flex  justify-center bg-cover" style={{ backgroundImage: 'url("../src/images/.jpg")', backgroundPosition: 'right 25%' }}>
      <div><TopNavBar
        managerName="Samadi Senavirthne"
        managerImage="/Images/user.png"
      /></div>
      <div className='p-10 '>
        <div className='flex justify-between item-center'>
          <h1 className='text-3xl my-8 text-black font-bold tracking-wide'>
            Manage Users - Registered Users List
          </h1>

        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="className= border border-blue-300 rounded-md px-3 py-1 w-full"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full'>
            <thead>
            <tr>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    No
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    First name
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Last name
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Date of Birth
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    contact Number
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Address
                  </th>
                   <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    NIC
                  </th>
                   <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Username
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Email
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Opretaions
                  </th>
                </tr>

            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className='h-8'>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {index + 1}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.firstName}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">

                    {user.lastName}
                  </td>
                  <td className= "p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.dateOfBirth}
                  </td>
                  <td className= "p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.contactNumber}
                  </td>
                  <td className= "p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.address}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.NIC}
                  </td>
                  <td className= "p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.username}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {user.email}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/users/details/${user._id}`}>
                        <BsInfoCircle className='text -2xl text-blue-800' />
                      </Link>
                      <Link to={`/users/edit/${user._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                      <Link to={`/users/delete/${user._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                      </Link>
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

export default Cusdetails;
