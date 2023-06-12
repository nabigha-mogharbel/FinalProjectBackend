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
import Schedule from "./models/Schedule.js"
import TripModel from "./models/Trip.js"
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

// error handler
app.use(function (err, req, res, next) {
 return res.status(err.status || 500).send({
    success: false,
    message: "balouta",
  });
});

app.use("*",(req,res)=>{
  return res.status(404).send({message:"api endpoint not found"})
})
cron.schedule('7 21 * * 0,1,2,3,4', () => {
  try{

    Schedule.find({}).then(
            function (success) {
              let arr=[]
              success.map(sched=> {
                let today = new Date();
                let startTime = sched.startTime;
                let endTime=sched.endTime;
                let day = today.getDate();
                let starttomorrow = new Date(today);
                let endtomorrow=new Date(today)
                //make date for tomorrow
                starttomorrow.setDate(day + 1);
                endtomorrow.setDate(day + 1);
                //take time of mongo schedule
                let startDate = new Date(startTime);
                let endDate=new Date(endTime)
                let starthours = startDate.getUTCHours();
                let startminutes = startDate.getUTCMinutes();
                let startseconds = startDate.getUTCSeconds();
                let endhours = endDate.getUTCHours();
                let endminutes = endDate.getUTCMinutes();
                let endseconds = endDate.getUTCSeconds();
                // Set the time components in starttomorrow
                starttomorrow.setUTCHours(starthours);
                starttomorrow.setUTCMinutes(startminutes);
                starttomorrow.setUTCSeconds(startseconds);
                endtomorrow.setUTCHours(endhours);
                endtomorrow.setUTCMinutes(endminutes);
                endtomorrow.setUTCSeconds(endseconds);
                let isostartTime=starttomorrow.toISOString();
                let isoendTime=endtomorrow.toISOString();
                console.log(isostartTime, sched.defaultBusId)
                let model= new TripModel({
                  scheduleId: sched._id,
                  totalPassenger: 0,
                  emptySeats:30,
                  date: isostartTime,
                  lon:35.835748,
                  lat:34.434422,
                  bookedPassengers:[],
                  busId: sched.defaultBusId,
                  tripStatus:"scheduled",
                  busStatus:"N/A",
                  message:"The trip is scheduled",
                  busManagerId:sched.defaultDriverId,
                  startTime:isostartTime,
                  endTime:isoendTime,
                })
                arr.push(model)
              })
              TripModel.insertMany(arr).then(function(success){
                return console.log("trips created", new Date())
              }, function(reject){
                return console.log("trips are not created 1", reject)
              })

            },
            function (reject) {
              return console.log("trips are not created 2", reject)
            }
          );
        } catch (error) {
          return console.log("trips are not created 3", error)
        }
}, null, false, "Asia/Beirut");