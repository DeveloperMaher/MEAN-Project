// src/services/authService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = (user, opts = { expiresIn: '1d' }) => {
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, {
    expiresIn: opts.expiresIn,
  });
};

const registerUser = async ({ name, email, password, role = 'user' }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 409; 
    throw error;
  }
  // create OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

  const user = new User({ name, email, password, role, otp, otpExpires });
  await user.save(); 

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your account — OTP',
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
  });

  return { message: 'OTP sent to email' };
};

const verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.isVerified) {
    const error = new Error('User already verified');
    error.statusCode = 400;
    throw error;
  }

  if (!user.otp || user.otp !== otp) {
    const error = new Error('Invalid OTP');
    error.statusCode = 401;
    throw error;
  }
  
  if (user.otpExpires < new Date()) {
    const error = new Error('OTP expired');
      error.statusCode = 410;
      throw error;
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = generateToken(user);
  return { message: 'User verified successfully', token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (!user.isVerified) {
    const error = new Error('User not verified');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user, { expiresIn: '1h' });
  return {
    token,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    },
  };
};

module.exports = { registerUser, verifyOtp, loginUser, generateToken };