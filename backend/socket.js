const socketIo = require("socket.io");
 
let io;
const connectedUsers = {};
 
module.exports = {
 
  init: (server) => {

    io = socketIo(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
 
    io.on("connection", (socket) => {
 
      console.log("User connected:", socket.id);
 
      socket.on("register", (userId) => {
        connectedUsers[userId] = socket.id;
        
        io.emit("onlineUsers", Object.keys(connectedUsers)); // 🔥 important

        console.log("Registered user:", userId);
      });
 
      socket.on("disconnect", () => {
        for (let userId in connectedUsers) {
          if (connectedUsers[userId] === socket.id) {
            delete connectedUsers[userId];
            break;
          }
        }
 
        io.emit("onlineUsers", Object.keys(connectedUsers)); 

        console.log("User disconnected:", socket.id);
      });

    });
 
  },
 
  getIO: () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
  },
 
  getUserSocket: (userId) => {
    return connectedUsers[userId];
  }
 
};