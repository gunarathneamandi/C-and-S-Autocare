import express from 'express';
import nodemailer from 'nodemailer';
import { Coupon } from '../models/couponmodel.js';

import {User} from '../models/userModel.js';
const router = express.Router();



router.post('/share-coupon', async (req, res) => {
  const { couponId, mostSpendingUserIds } = req.body;

  const coupon = await Coupon.findById(couponId);

  const mostSpendingUsers = await User.find({ _id: { $in: mostSpendingUserIds } });

  
  const emailMessage = `
    Dear valued customer,
    
    Here is a special coupon code just for you:
    
    Coupon Code: ${coupon.code}
    Expiration Date: ${coupon.expirationDate}
    Percentage: ${coupon.percentage}%
    
    Enjoy your discount!
  `;

 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'hasithaudara1028@gmail.com',
        pass: 'kdar vzgy qltt ijql',
      },
      tls: {
        rejectUnauthorized: false, 
      },
  });

  
  mostSpendingUsers.forEach(user => {
    transporter.sendMail({
      from: 'hasithaudara1028@gmail.com',
      to: user.email,
      subject: 'Special Coupon Offer',
      text: emailMessage,
    }, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        
      } else {
        console.log('Email sent successfully:', info.response);
       
      }
    });
  });

  res.json({ message: 'Coupons shared successfully with most spending customers' });
});

router.post('/send-payment-email', async (req, res) => {
  const { recipientEmail, message } = req.body;

  try {
    
    const transporter = nodemailer.createTransport({
      
      service: 'gmail',
      auth: {
        user: 'hasithaudara1028@gmail.com',
        pass: 'kdar vzgy qltt ijql',
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

   
    const mailOptions = {
      from: 'hasithaudara1028@gmail.com',
      to: recipientEmail,
      subject: 'Payment Success Notification',
      text: message,
    };

   
    await transporter.sendMail(mailOptions);

    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});



export default router;
