const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
  user1:{
    type: mongoose.Schema.Types.String,
    ref: "Player",
    required: true,
  },
  user2:{
    type: mongoose.Schema.Types.String,
    ref: "Player",
    required: true,
  }
  },
  { timestamps: true }
  );
  
  module.exports = mongoose.model("Chats", ChatSchema);
  