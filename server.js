const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./index");

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then(() => console.log("Connected to the database"))
  .catch(() => console.log('Couldn"t connect to the database'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Logging into port ${port}`);
});

//Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
