const express = require("express");
const middleware=require('./middleware/authenticate_token');
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
app.use(middleware)
const playersRouter = require("./routes/players");
const placesRouter = require("./routes/places");

// Routes
app.use("/api/players", playersRouter);
app.use("/api/places", placesRouter);
app.use('/api/v1/chat',ChatRoutes)
app.use('/api/v1/message',MessageRoutes)


module.exports = app;
