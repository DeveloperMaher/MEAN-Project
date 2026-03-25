// backend/src/utils/emailSender.js

const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
 
module.exports = {
  sendEmail: async (to, subject, html) => {
    try {
      await transporter.sendMail({
        from: `"CRM System" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      });
      console.log(`Email sent to ${to}`);
    } catch (err) {
      console.error(`Failed to send email: ${err.message}`);
    }
  },
};


// Usage:
// const { sendEmail } = require('../utils/emailSender');
 
// await sendEmail(
//   'client@example.com',
//   'Welcome to CRM',
//   '<h1>Welcome!</h1><p>Your account has been created.</p>'
// );