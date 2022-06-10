const app = require("./app");
const connectDB = require("./db/connectDB");
require("dotenv").config();

// Port
const port = process.env.PORT || 4000;

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
