import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/uploads", express.static("./uploads"));

// create and error object,catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`
      );
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});
