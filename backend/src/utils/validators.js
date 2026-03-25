// backend/src/utils/validators.js
 
module.exports = {
  isEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
 
  isStrongPassword: (password) => {
    // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  },
 
  isPhoneNumber: (phone) => {
    const regex = /^\+?[0-9]{7,15}$/;
    return regex.test(phone);
  }
};

// Usage in a controller or service:
// const { isEmail, isStrongPassword } = require('../utils/validators');
 
// if (!isEmail(req.body.email)) {
//   return res.status(400).json({ message: 'Invalid email format' });
// }
 
// if (!isStrongPassword(req.body.password)) {
//   return res.status(400).json({ message: 'Password is not strong enough' });
// }