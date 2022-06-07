const mongoose = require("mongoose");

const Team = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  players: {
    type: [String],
  },
});

module.exports = mongoose.model("Team", TeamSchema);
