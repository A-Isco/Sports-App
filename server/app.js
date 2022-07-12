const express = require("express");
const app = express();
require("dotenv").config();
const cors=require('cors')
const auth_routes = require(__dirname+'/routes/auth_routes.js');
const ChatRoutes=require('./routes/chat')
const MessageRoutes=require('./routes/message')
app.use(express.json());
app.use(cors())

// Routers
auth_routes(app);
const playersRouter = require("./routes/players");
const placesRouter = require("./routes/places");

// Routes
app.use("/api/players", playersRouter);
app.use("/api/places", placesRouter);
app.use('/api/v1/chat',ChatRoutes)
app.use('/api/v1/message',MessageRoutes)


module.exports = app;
