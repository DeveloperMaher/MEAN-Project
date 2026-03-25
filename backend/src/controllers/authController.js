// src/controllers/authController.js
const { registerUser, loginUser, verifyOtp } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await registerUser({ name, email, password, role });
    res.status(201).json(result);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOtp({ email, otp });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, verifyOtpController, login };