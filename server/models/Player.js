const mongoose = require("mongoose");
const {string} = require("joi");
const reviewSchema = mongoose.Schema(
    {
      // name: { type: String, required: true },
      rating: { type: Number, required: true },

      // user: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     required: true,
      //     ref: 'Player',
      // },
    },
    {
      timestamps: true,
    }
)

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
  reviews:[reviewSchema],
  numReviews: {
    type: Number,

  },

  isAdmin: {
    type: Boolean,
    required:false
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
        type: String
      }
});

module.exports = mongoose.model("Player", PlayerSchema);
