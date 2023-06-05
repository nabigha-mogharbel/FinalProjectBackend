import express from "express";
import morgan from "morgan";
//import connectDB from "./config/db.js";
import cron from "node-cron"
import cors from "cors";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import DB from "./config/db.js"
import {PORT, MODE, SOCKET} from "./config/index.js"
import Model from "./models/Trip.js"
import BusModel from "./models/Bus.js"
import ScheduleModel from "./models/Schedule.js"
import UserModel from "./models/User.js"
//import Routes from "./routes/index.js"
import userRoutes from "./routes/user.js"
import busRoutes from "./routes/bus.js"
import lineRoutes from "./routes/line.js"
import tripRoutes from "./routes/trip.js"
import scheduleRoutes from "./routes/schedule.js"
const app = express();

app.use(express.json());
app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (MODE === "dev") {
  app.use(morgan("dev"));
}


app.get("/", (req, res) => {
  res.status(200).send("TripoLine Backend is running...");
});
app.get("/test", (req, res) => {
  console.log("a request")
  res.status(200).send({message:"Faten is the destroying of OpenAI..."});
});
app.use("/app/auth", userRoutes);
app.use("/app/line", lineRoutes);
app.use("/app/bus", busRoutes);
app.use("/app/schedule", scheduleRoutes)
app.use("/app/trip", tripRoutes)
//app.use("/",Routes );
app.use("/uploads", express.static("./uploads"));



DB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `TripoLine Backend is running on port ${PORT}!!!`
      );
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
// create and error object,catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(function (err, req, res, next) {
  // console.log(err)
 return res.status(err.status || 500).send({
    success: false,
    message: "balouta",
  });
});

app.use("*",(req,res)=>{
  return res.status(404).send({message:"api endpoint not found"})
})
cron.schedule('0 18 * * 0,1,2,3,4', () => {
  console.log('running a task every minute');
});

// io.on('connection', (socket) => {
//   console.log("conn")
//   Model.watch().
//   on('change', data => socket.emit(data));
//   socket.emit('Welcome!');
//   io.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


/*io.on("connection",(socket)=>{
 
} )*/
// io.sockets.on("tripWatching",(socket)=>{
//   Model.watch().on('change', (data)=>console.log("btata"))
  
// });

// io.on("connection", (socket) => {
//   socket.emit("hello", "harra");
// });
// io.on("batata", (socket) => {
//   socket.emit("hello", "harra");
// });