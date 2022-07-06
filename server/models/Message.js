const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
       type: String, 
       required: true 
    },
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);