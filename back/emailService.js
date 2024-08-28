import nodemailer from "nodemailer";

// Create a transporter using a dedicated Gmail account for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aygunarathne394@gmail.com", // Your Gmail email address for sending emails
    pass: "dshl uqpo jiic yjrs", // Your Gmail password
  },
});

// Function to send email notification
const sendEmail = (to, subject, text) => {
  // Define email options
  const mailOptions = {
    from: "aygunarathne394@gmail.com", // Your Gmail email address for sending emails
    to: to, // Recipient email address
    subject: subject, // Email subject
    text: text, // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendEmail;
