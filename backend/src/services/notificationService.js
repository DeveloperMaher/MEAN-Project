const Notification = require("../models/Notification");
const socket = require("../../socket");
 
exports.createNotification = async (userId, message, taskId) => {
 
  const notification = await Notification.create({
    userId,
    message,
    taskId
  });
 
  const io = socket.getIO();
  const socketId = socket.getUserSocket(userId.toString());
 
  if (socketId) {
    io.to(socketId).emit("notification", notification);
  }
 
  return notification;
};