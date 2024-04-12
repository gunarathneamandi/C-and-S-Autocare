import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Createpayment from './pages/Createpayment'
import Editpayment from './pages/Editpayment'
import DeletePayment from './pages/DeletePayment'
import Showpayment from './pages/Showpayment'
import Showitems from './pages/Showitems'
import Createitems from './pages/Createitems'
import Paymentdashboard from './pages/Paymentdashboard'
import SalesDetails from './pages/SalesDetails'
import ReportCoupon from './pages/ReportCoupon'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/payment/create' element={<Createpayment/>} />
      <Route path='/payment/details/:id' element={<Showpayment/>} />
      <Route path='/payment/edit/:id' element={<Editpayment/>} />
      <Route path='/payment/delete/:id' element={<DeletePayment/>} />
      <Route path='/cart/show' element={<Showitems/>} />
      <Route path='/cart/create' element={<Createitems/>} />
      <Route path='/payment/dashboard' element={<Paymentdashboard/>} />
      <Route path='/payment/sales' element={<SalesDetails/>} />
      <Route path='/payment/report' element={<ReportCoupon/>} />
    </Routes>
  )
}

export default App