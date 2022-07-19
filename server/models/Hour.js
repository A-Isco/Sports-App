const mongoose = require("mongoose");
const HourSchema = new mongoose.Schema({
  from:{
    type: mongoose.Schema.Types.Number,
    min: 0,
    max: 24,
    required: true,
  },
  to:{
    type: mongoose.Schema.Types.Number,
    min: 0,
    max: 24,
    required: true,
  }
  }
  );
  
  module.exports = mongoose.model("hour", HourSchema);