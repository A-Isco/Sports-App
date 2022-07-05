const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routers
const playersRouter = require("./routes/players");
const sportsRouter = require("./routes/sports");

// Routes
app.use("/api/players", playersRouter);
app.use("/api/sports",sportsRouter);

module.exports = app;
