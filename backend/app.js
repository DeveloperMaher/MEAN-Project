require('dotenv').config();
const express = require("express");
const http = require('http');       
const socket = require('./socket');   

const { connectDB } = require('./src/config/db');

const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

const { protect } = require('./src/middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes); 
app.use('/api', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);


app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are authorized` });
});

// Example route
app.get('/', (req, res) => res.send('hello world from app.js'));

// Connect DB then start server
const start = async () => {
  await connectDB();
  const port = process.env.PORT || 3000;

  // create http server from express app (so we have a server to attach socket.io to)
  const server = http.createServer(app);

  // initialize sockets with the server
  socket.init(server);

  // start listening
  server.listen(port, () => console.log(`Server listening on ${port}`));
};

start().catch(err => {
  console.error('Failed to start app', err);
  process.exit(1);
});
