import React from 'react'
import SideNav from '../components/SideNav'

const SalesDetails = () => {
    return (
        <div className=' flex'>
        <SideNav/>
        <div>
        <div className='flex justify-between '>
                    <h1 className='text-4xl font-bold mx-10 my-8'>Sales Details</h1>
         </div>
         
<form class="max-w-md ml-10">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

         <div className="relative flex ml-10 flex-col w-full h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      
      <div className="p-6 px-0">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4  border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Order Number
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Time
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Date
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Customer
                </p>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Amount
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
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Hasitha
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  $12333
                </p>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <button
          class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Previous
        </button>
        <div class="flex items-center gap-2">
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              1
            </span>
          </button>
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              2
            </span>
          </button>
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              3
            </span>
          </button>
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              ...
            </span>
          </button>
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              8
            </span>
          </button>
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              9
            </span>
          </button>
          <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              10
            </span>
          </button>
        </div>
        <button
          class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Next
        </button>
      </div>
    </div>
         </div>
        </div>
    
      )
}

export default SalesDetails