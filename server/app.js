const express = require("express");
const app = express();
require("dotenv").config();
const cors=require('cors')

const ChatRoutes=require('./routes/chat')
app.use(express.json());
app.use(cors())

app.use('/api/v1/chat',ChatRoutes)
module.exports = app;
