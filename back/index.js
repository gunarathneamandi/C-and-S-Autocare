import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Payment } from "./models/paymentmodel.js";
import { Cart } from "./models/cartmodel.js";
import paymentroute from "./routes/paymentroute.js";
import cartroute from "./routes/cartroute.js";
import orderroute from "./routes/orderroute.js";
import userroute from "./routes/userroute.js";
import cors from "cors";

const app= express();

app.use(express.json());

app.use(cors());
app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome')
});

app.use('/payment',paymentroute);
app.use('/cart',cartroute);
app.use('/order',orderroute);
app.use('/user',userroute);
mongoose.connect(mongoDBURL).then(()=>{
    console.log('Connection succesful');
    app.listen(PORT,()=>{
        console.log(`App is listening to port : ${PORT} `);
    });
}).catch((error)=>{
    console.log(error);
})