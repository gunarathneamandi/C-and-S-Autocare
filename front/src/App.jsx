import React from 'react'
import { Routes,Route } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'

import Createpayment from './pages/Createpayment'
import Cart from './pages/Cart'
import Paymentdashboard from './pages/Paymentdashboard'
import SalesDetails from './pages/SalesDetails'
import ReportCoupon from './pages/ReportCoupon'
import Register from './pages/Register'
import Login from './pages/Login'
import Cusdetails from './pages/Cusdetails'
import Deleteprofile from './pages/Deleteprofile'
import Deleteuser from './pages/Deleteuser'
import Editprofile from './pages/Editprofile'
import Edituser from './pages/Edituser'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import Showuser from './pages/Showuser'
import UserDashboard from './pages/UserDashboard'
import UserHome from './pages/UserHome'
import VehicleHome from "./pages/VehicleHome";
import CreateVehicles from "./pages/CreateVehicles";
import ShowVehicle from "./pages/ShowVehicle";
import EditVehicle from "./pages/EditVehicle";
import DeleteVehicle from "./pages/DeleteVehicle";
import VehiclesTable from "./pages/VehiclesTable";
import VehicleDash from "./pages/VehicleDash";

import { CreateEmployee } from './pages/CreateEmployee'
import { EditEmployee } from './pages/EditEmployee'
import  DeleteEmployee  from './pages/DeleteEmployee'
import { ViewEmployee } from './pages/ViewEmployee'
import SalaryEmployee from './pages/SalarayEmployee'
import MainDashboardEmployee from './pages/MainDashboardEmployee'
import UpdateSalaryEmployee from './pages/UpdateSalaryEmployee'
import PaysheetReportEmployee from './pages/PaysheetReportEmployee'
import LeaveEmployee from './pages/LeaveEmployee'
import EmployeeLogin from './pages/EmployeeLogin'
import EmployeeProfile from './pages/EmployeeProfile'
import LeaveFormEmployee from './pages/LeaveFormEmployee'
import EmployeeSalaryDashboard from './pages/EmployeeSalarayDashboard'

import InventoryHome from "./pages/InventoryHome";
import CreateItem from "./pages/CreateItem";
import ShowItem from "./pages/ShowItem";
import EditItem from "./pages/EditItem";
import DeleteItem from "./pages/DeleteItem";
import ProductHome from "./pages/ProductHome";
import ViewProduct from "./pages/ViewProduct";

import PHome from './pages/PHome.jsx';
import ShowBooking from './pages/ShowBooking.jsx';
import CreateBooking from './pages/CreateBooking.jsx';
import EditBooking from './pages/EditBooking.jsx';
import DeleteBooking from './pages/DeleteBooking.jsx';
import AdminHome from './pages/AdminHome.jsx';
// import VerifyBooking from './pages/VerifyBooking.jsx';
import ManagerLogin from './pages/ManagerLogin.jsx';
import ManagerRegister from './pages/ManagerRegister.jsx';
import UserBooking from './pages/UserBooking.jsx';


import ServiceTable from './pages/ServicesTable.jsx'
import ShowServices from './pages/ShowServices.jsx'
import CreateServices from './pages/CreateServices.jsx'
import EditServices from './pages/EditServices.jsx'
import DeleteServices from './pages/DeleteServices'
import CreatePackag from './pages/CreatePackag'
import DeletePackag from './pages/DeletePackag'
import EditPackag from './pages/EditPackag'
import ShowPackag from './pages/ShowPackag'
import ManagerRegistrationForm from './pages/ManagerRegistrationForm'
import PackageTable from './pages/PackageTable.jsx'
import AdminLogin from './pages/AdminLogin'
import ShowManager from './pages/ShowManager'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />

      <Route path='/signup' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/cusdetails' element={<Cusdetails/>} />
      <Route path='/profile/delete' element={<Deleteprofile/>} />
      <Route path='/users/delete/:id' element={<Deleteuser/>} />
      <Route path='/profile/update' element={<Editprofile/>} />
      <Route path='/users/edit/:id' element={<Edituser/>} />
      <Route path='/forgotpassword' element={<ForgotPassword/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/resetpassword/:resetToken' element={<ResetPassword/>} />
      <Route path='/users/details/:id' element={<Showuser/>} />
      <Route path='/dashboard' element={<UserDashboard/>} />
      <Route path='/userHome' element={<UserHome/>} />



      <Route path='/payment/create' element={<Createpayment/>} />
      <Route path='/cart/show' element={<Cart/>} />
      <Route path='/payment/dashboard' element={<Paymentdashboard/>} />
      <Route path='/payment/sales' element={<SalesDetails/>} />
      <Route path='/payment/report' element={<ReportCoupon/>} />

      <Route path = '/vehicle/home' element={<VehicleHome />} />
      <Route path = '/vehicles/create' element={<CreateVehicles />} />
    <Route path = '/vehicles/details/:id' element={<ShowVehicle />} />
    <Route path = '/vehicles/edit/:id' element={<EditVehicle />} />
    <Route path = '/vehicles/delete/:id' element={<DeleteVehicle />} />
    <Route path = '/vehicles/vehiclestable' element={<VehiclesTable />} />
    <Route path = '/vehicles/dashboard' element={<VehicleDash />} />

    <Route path='/employee/login' element={<EmployeeLogin></EmployeeLogin>}></Route>
        <Route path='/employee/profile' element={<EmployeeProfile></EmployeeProfile>}></Route>
        <Route path='/employee/leaveForm' element={<LeaveFormEmployee></LeaveFormEmployee>}></Route>
        <Route path='/employee/maindash' element={<MainDashboardEmployee></MainDashboardEmployee>}></Route>
        <Route path='/employee/create' element={<CreateEmployee></CreateEmployee>}></Route>
        <Route path='/employee/edit/:id' element={<EditEmployee></EditEmployee>}></Route>
        <Route path='/employee/delete/:id' element={<DeleteEmployee></DeleteEmployee>}></Route>
        <Route path='/employee/view/:id' element={<ViewEmployee></ViewEmployee>}></Route>
        <Route path='/employee/salary/main' element={<EmployeeSalaryDashboard></EmployeeSalaryDashboard>}></Route>
        <Route path='/employee/salary/:id' element={<SalaryEmployee></SalaryEmployee>}></Route>
        <Route path='/employee/salary/update/:id' element={<UpdateSalaryEmployee></UpdateSalaryEmployee>}></Route>
        <Route path='/employee/salary/Paysheet' element={<PaysheetReportEmployee></PaysheetReportEmployee>}></Route>
        <Route path='/employee/leave' element={<LeaveEmployee></LeaveEmployee>}></Route>

        <Route path="/InventoryHome" element={<InventoryHome />} />
      <Route path="/stocks/create" element={<CreateItem />} />
      <Route path="/stocks/details/:id" element={<ShowItem />} />
      <Route path="/stocks/edit/:id" element={<EditItem />} />
      <Route path="/stocks/delete/:id" element={<DeleteItem />} />
      <Route path="/productHome" element={<ProductHome />} />
      <Route path="/view/:id" element={<ViewProduct />} />

      <Route path='/AdminHome' element={<AdminHome/>} />
      <Route path='/booking/details/:id' element={<ShowBooking/>} />
      <Route path='/booking/create' element={<CreateBooking/>}/>
      <Route path='/booking/edit/:id' element={<EditBooking/>}/>
      <Route path='/booking/delete/:id' element={<DeleteBooking/>}/>
      <Route path='/mbooking' element = {<PHome/>}/>
      <Route path='/booking/show' element={<UserBooking/>}/>
      <Route path='/manager/login' element = {<ManagerLogin/>}/>
      <Route path='/manager/reg' element = {<ManagerRegister/>}/>

      <Route path='/services/create' element={<CreateServices/>}/>
      <Route path='/services/details/:id' element={<ShowServices/>}/>
      <Route path='/services/edit/:id' element={<EditServices/>}/>
      <Route path='/services/delete/:id' element={<DeleteServices/>}/>
      <Route path='/packages/create' element={<CreatePackag/>}/> 
      <Route path='/packages/details/:id' element={<ShowPackag/>}/>
      <Route path='/packages/edit/:id' element={<EditPackag/>}/>
      <Route path='/packages/delete/:id' element={<DeletePackag/>}/>  
      <Route path='/ManagerSignup' element={<ManagerRegistrationForm/>}/>
      <Route path='/Home/packags' element={<PackageTable/>}/>
      <Route path='/Adlogin' element={<AdminLogin/>}/>
      <Route path='/ShowMan' element={<ShowManager/>}/>
      <Route path='/servicetable' element={<ServiceTable/>}/>
    </Routes>
  )
}

export default App