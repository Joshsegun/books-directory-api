// ()
const express = require("express");

const ErrorHandler = require("./utils/errorHandler");
const globalErrorHandler = require("./controllers/errorController");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use("*", (req, res, next) => {
  // next(
  //   res.status(500).json({
  //     status: "error",
  //     message: "Something wrong happened",
  //   })
  // );

  next(
    new ErrorHandler(
      `${req.originalUrl} does not exist on this server...Check the url properly`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
