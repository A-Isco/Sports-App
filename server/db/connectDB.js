const mongoose = require("mongoose");
url="mongodb://127.0.0.1:27017/almalaab";
const connectDB= mongoose.connect('mongodb://127.0.0.1:27017/almalaab', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true//make sure indexes are made
}).then(()=>{
  console.log('database connected ....')
}).catch((error)=>{
  console.log(error.message)
})

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(()=>{
//     console.log('database connected ....')
//   }).catch((error)=>{
//     console.log(error.message)
//   })
// };




module.exports = connectDB;
