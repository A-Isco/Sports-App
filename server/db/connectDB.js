






const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('database connected ....')
  }).catch((error) => {
    console.log(error.message)
  })
};

module.exports = connectDB;