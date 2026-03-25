// backend/src/utils/jwt.js

const jwt = require('jsonwebtoken');
 
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
 
module.exports = {
  // Generate a JWT token for a user
  generateToken: (user) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  },
 
  // Verify a token and return decoded payload
  verifyToken: (token) => {
    return jwt.verify(token, SECRET_KEY);
  }
};