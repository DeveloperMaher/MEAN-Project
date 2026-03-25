// backend/src/utils/logger.js

const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),cls
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});
 
module.exports = logger;

// Usage:
// const logger = require('../utils/logger');
 
// try {
//   const user = await UserService.createUser(req.body);
// } catch (error) {
//   logger.error(`Failed to create user: ${error.message}`);
// }