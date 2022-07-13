const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
  },
  nationalID: {
    type: String,
  },
  region: {
    type: String,
  },
  sports: {
    type: [String],
  },
  image: {
   type: String,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);