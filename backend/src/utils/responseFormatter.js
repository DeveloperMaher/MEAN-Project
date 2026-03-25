// backend/src/utils/responseFormatter.js

module.exports = {
  success: (res, data = {}, message = 'Success', status = 200) => {
    return res.status(status).json({ success: true, message, data });
  },
 
  error: (res, message = 'Error', status = 500, data = {}) => {
    return res.status(status).json({ success: false, message, data });
  }
};


// Usage:
// const { success, error } = require('../utils/responseFormatter');
 
// static async getAllUsers(req, res, next) {
//   try {
//     const users = await UserService.getAllUsers();
//     return success(res, users, 'Users fetched successfully');
//   } catch (err) {
//     return error(res, 'Failed to fetch users');
//   }
// }
 