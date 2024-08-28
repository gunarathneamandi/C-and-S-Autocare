// Email Utility
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail
  auth: {
    user: 'Jithmisamadi2001@gmail.com',
    pass: 'vgjtgbiobiskstlp',
  },
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: 'Jithmisamadi2001@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink }">here</a> to reset your password.</p>`,
    });
  } catch (err) {
    console.error('Error sending password reset email:', err);
    throw new Error('Failed to send password reset email');
  }
};

