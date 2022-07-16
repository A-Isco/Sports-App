const app = require("./app");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const socket = require('socket.io')


// Port
const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    console.log(process.env.MONGO_URI);
    connectDB(process.env.MONGO_URI);
    const server = app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",

        credentials: true,
      },
    });
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on("send-msg", (data) => {
        console.log(data)
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket)
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data);
        }
      });
    });

  } catch (error) {
    console.log(error);
  }
};

// Start Server
startServer();
// console.log(server)
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",

//     credentials: true,
//   },
// });
// console.log(io)
// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });