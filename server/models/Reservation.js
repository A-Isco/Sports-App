const mongoose = require("mongoose");
const   ReservationSchema = new mongoose.Schema({
  place:{
    type: mongoose.Schema.Types.String,
    ref: "Place",
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.String,
    ref: "Player",
    required: true,
  },
  date:{
    type: mongoose.Schema.Types.String,
    required: true,

  },
  time:{
    type: mongoose.Schema.Types.String,
    ref: "hour",
    required: true,
  }
  },
  { timestamps: true }
  );
  
  module.exports = mongoose.model("reservation", ReservationSchema);
  