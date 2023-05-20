import { Schema, model } from "mongoose";
import validate from 'mongoose-validator' 
const scheduleSchema = Schema(
  {
    startLocation: {
      type: String,
      required: [true, "Please enter the start location"],
      trim: true,
    },
    endLocation: {
      type: String,
      required: [true, "Please enter the end location"],
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, "Please enter the start time"],
    },
    endTime: {
      type: Date,
      required: [true, "Please enter the end time"],

    },
    days: [{type:String, trim:true, }]
  
    ,
    lineId:{
        type:Schema.Types.ObjectId,
        ref:"Line"
    }
  },
  {
    collection: "Schedule",
  }
);
scheduleSchema.pre(["find", "findOne"], function () {
  this.populate(["lineId"]);
});
const Model = model("Schedule", scheduleSchema);
export default Model;