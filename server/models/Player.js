const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  gender: {
    type: String,
    required: true,
  },
  birth_date:{
    type:Date,
    required:true
  },
  age: {
    type: Number,
    //required: true,
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
