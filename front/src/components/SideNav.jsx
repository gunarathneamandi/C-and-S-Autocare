import React from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";

const SideNav = () => {
  return (
    
    <Card className="h-[calc(100vh-2rem)] w-1/6 max-w-[20rem] p-4 shadow-xl bg-gray-100 shadow-blue-gray-900/5">
    
    <List>
      <Link to='/payment/dashboard'>
      <ListItem className="hover:bg-blue-100 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
        <ListItemPrefix>
          <PresentationChartBarIcon className="h-12 w-5" />
        </ListItemPrefix>
        Dashboard
      </ListItem>
      </Link>
      <Link to='/payment/sales'>
      <ListItem className="hover:bg-blue-100 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
        <ListItemPrefix>
          <ShoppingBagIcon className="h-12 w-5" />
        </ListItemPrefix>
        Sales Details
      </ListItem>
      </Link>
      <Link to='/payment/report'>
      <ListItem className="hover:bg-blue-100 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
        <ListItemPrefix>
          <UserCircleIcon className="h-12 w-5" />
        </ListItemPrefix>
        Report and Coupons
      </ListItem>
      </Link>
      <ListItem className="hover:bg-blue-100 rounded-lg py-1 px-2 cursor-pointer transition-colors duration-300">
        <ListItemPrefix>
          <PowerIcon className="h-12 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </List>
  </Card>
        );
      }
  

export default SideNav