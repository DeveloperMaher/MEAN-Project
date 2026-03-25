const Notification = require("../models/Notification");
 
exports.getUserNotifications = async (req, res) => {
  const userId = req.params.userId;
  const notifications = await Notification
    .find({ userId })
    .sort({ createdAt: -1 });
  const unreadCount = await Notification.countDocuments({
    userId,
    read: false
  });
  res.json({
    notifications,
    unreadCount
  });
};
 
exports.markAsRead = async (req, res) => {
  const id = req.params.id;
 
  const notification = await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );
 
  res.json(notification);
};