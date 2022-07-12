const mongoose = require("mongoose");
const {string} = require("joi");

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
    type: String,
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
  address: {
    type: String,
  },
  img:
      {
        contentType: String
      }
});

module.exports = mongoose.model("Player", PlayerSchema);
