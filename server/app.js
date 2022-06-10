const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routers
const playersRouter = require("./routes/players");

// Routes
app.use("/api/players", playersRouter);

module.exports = app;
