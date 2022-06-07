const app = require("./app");
const connectDB = require("./db/connectDB");
const cors=require('cors')
require("dotenv").config();

// Port
const port = process.env.PORT || 3000;
app.use(cors())

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Start Server
startServer();
