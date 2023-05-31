import { Schema, model } from "mongoose";
import validate from 'mongoose-validator' 
const tripSchema = Schema(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref:"Schedule",
      required: true,
    },
    totalPassenger:{
      type:Number,
      default:0
    },
    emptySeats: {
      type: Number,
      default:0

    },
    date: {
      type: Date,
      required: [true, "Please enter the trip date"],
    },
    bookedPassengers: [{
      passengerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
      },
      status:{
        type:String
      }

  }],
    busId: {type:Schema.Types.ObjectId, ref:"Bus", require:true },
    tripStatus:{
        type:String
    },
    busStatus:{
        type:String
    },
    message:{
        type:String
    },
    busManagerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
  },
  {
    collection: "Trip",
  }
);
tripSchema.pre(["find", "findOne"], function(){
  this.populate(["scheduleId", "busId", "busManagerId"])
})

const Model = model("Trip", tripSchema);
export default Model;