import React from 'react'
import SideNav from '../components/SideNav'

const ReportCoupon = () => {
  return (
    <div className=' flex'>
        <SideNav/>
        <div>
        <div className='flex justify-between '>
                <h1 className='text-4xl font-bold mx-10 my-8'>Reports and Coupons</h1>
     <button  className="mt-24 mb-6 w-40 h-10 ml-80 rounded-md bg-blue-900 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Add Coupon</button>
     
     </div>
     
     <div className="relative flex ml-32 flex-col w-4/5 h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
     <div className="p-6 px-0">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4  border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Coupon Name
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Date
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Persentage
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Delete
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <p className="block mx-10 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                    123456
                  </p>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                3:00pm
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                06/2026
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
            <button
              className="relative mx-4 h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-red-500 disabled:opacity-50 disabled:shadow-none"
              type="button">
              Delete
            </button>
          </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      </div>
      <div className='flex justify-between mt-16 '>
                <h1 className='text-4xl font-bold mx-10 my-8'>Most Spend Customers In Last Month</h1>
     </div>
     <div className="relative flex ml-32 flex-col w-4/5 h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
     <div className="p-6 px-0">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4  border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Customer Name
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                   Email
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Share
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <p className="block mx-10 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                    123456
                  </p>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                3:00pm
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
            <button
              className="relative mx-3 h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-blue-900 disabled:opacity-50 disabled:shadow-none"
              type="button">
              Share
            </button>
          </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      </div>
      <div className='my-6 ml-96'>
      <button  className="mt-6 w-2/4 ml-56 h-10 rounded-full bg-red-700 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Generate Monthly Report</button>
      </div>
     </div>
     
    </div>
  )
}

export default ReportCoupon