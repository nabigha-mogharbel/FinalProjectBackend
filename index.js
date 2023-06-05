import express from "express";
import morgan from "morgan";

import {Server} from "socket.io";
import http from "http"
import DB from "./config/db.js"
import {MODE, SOCKET} from "./config/index.js"
import Model from "./models/Trip.js"
import BusModel from "./models/Bus.js"
import ScheduleModel from "./models/Schedule.js"
import UserModel from "./models/User.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:"*"}});

if (MODE === "dev") {
  app.use(morgan("dev"));
}

DB()
  .then(() => {
    server.listen(SOCKET, () => {
  console.log(`TripoLine WebSocket is running on ${SOCKET}`)
})
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

io.on("connection", (socket) => {
  console.log("connected client", new Date().toISOString())

});
Model.watch({ fullDocument: "updateLookup" }).on('change', async data => {
  let bus=await BusModel.findById(data.fullDocument.busId);
  let schedule= await ScheduleModel.findById(data.fullDocument.scheduleId)
  let driver= await UserModel.findById(data.fullDocument.busManagerId)
  data.fullDocument.scheduleId=schedule
  data.fullDocument.busId=bus
  data.fullDocument.busManagerId=driver
  io.emit("tripWatching", data)});