import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userroute.js';
import cartRoute from './routes/cartroute.js';
import orderRoute from './routes/orderroute.js';
import paymentRoute from './routes/paymentroute.js';
import couponroute from './routes/couponroute.js';
import email from './routes/email.js';
import loginRoute from './routes/loginroute.js';
import vehiclesRoute from './routes/vehiclesRoute.js';
import profileRoute from './routes/profileroute.js';
import employeeRoute from "./routes/employeeRoute.js";
import paySheetRoute from "./routes/paysheetRoute.js";
import leaveRoute from "./routes/leaveRoute.js"
import employeeLoginRoute from "./routes/employeeLoginRoute.js"
import inventoryRoute from "./routes/inventoryRoute.js";
import bookingRoute from './routes/bookRoute.js';
import Adminroute from './routes/Adminroutes.js'
import { PORT, mongoDBURL } from './config.js'; 

const app = express();


app.use(express.json());
app.use(cors());


app.use('/users', userRoute);
app.use('/api/cart', cartRoute); 
app.use('/api/order', orderRoute); 
app.use('/api/payment', paymentRoute); 
app.use('/coupon', couponroute);
app.use('/email', email);
app.use('/api/auth', loginRoute);
app.use('/vehicles' , vehiclesRoute)
app.use("/api/auth", profileRoute);

app.use('/crud',employeeRoute);
app.use('/pay-sheets', paySheetRoute);
app.use('/leaves', leaveRoute);
app.use('/login' , employeeLoginRoute);

app.use("/stocks", inventoryRoute);

app.use('/booking',bookingRoute);
app.use('/',Adminroute);
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
