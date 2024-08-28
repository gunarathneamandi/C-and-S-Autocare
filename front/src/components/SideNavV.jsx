import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon,CurrencyDollarIcon, ClipboardDocumentListIcon, PowerIcon } from "@heroicons/react/24/solid";
import { FaBars } from 'react-icons/fa';

const SideNavV = ({ isOpen, toggleNav }) =>{

  return (
    <div className='top-0 left-0 h-full'>
      <button onClick={toggleNav} className="mt-16 ml-2 p-2 rounded-md text-geay hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <FaBars className="h-6 w-6" />
      </button>
    
      {isOpen && (

        <Card className=" h-[calc(100vh-2rem)] w-max p-4 pt-2 bg-white shadow-xl mr-5 ">
          <List className="mt-0 select-text">
            <Link to='/vehicles/dashboard'>
              <ListItem className="hover:text-red-800 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-12 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
            <Link to='/vehicles/vehiclestable'>
              <ListItem className="hover:text-red-800 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-12 w-5" />
                </ListItemPrefix>
                View all
              </ListItem>
            </Link>
           
            
            <ListItem className="hover:text-red-800 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
              <ListItemPrefix>
                <PowerIcon className="h-12 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      )}
    </div>
  );
}

export default SideNavV;