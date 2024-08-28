import React from 'react';

const TopNavBar = ({ managerName}) => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-red-600 shadow-md flex justify-between items-center p-2.5 z-50">
      <div className="logo flex items-center">
        <img src="/Images/company.png" alt="Company Logo" className="w-10 h-9 mr-2 rounded-full"/>
        <div className="ml-2 font-medium text-lg text-white"><h1>C & S AUTO CARE</h1></div>
      </div>
      <div className="manager-info flex items-center text-white">
        <div className='mr-5 '>
          <p className="text-m">{managerName}</p>
        </div>
        <img src="/Images/user.png" alt="Manager" className="w-8 h-8 rounded-full mr-2" /> 
      </div>
    </div>
  );
};

export default TopNavBar;