import { Schema, model } from "mongoose";

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
      default:30

    },
    date: {
      type: Date,
      required: [true, "Please enter the trip date"],
    },
    lon:{
      type:Schema.Types.Decimal128,
      required:true
    },
    lat:{
      type:Schema.Types.Decimal128,
      required:true
    }
    ,
    bookedPassengers: [{
      passengerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
      },
      status:{
        type:String
      }
  }],
    busId: {type:Schema.Types.ObjectId, ref:"Bus" },
    tripStatus:{
        type:String
    },
    busStatus:{
        type:String
    },
    message:{
        type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
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
tripSchema.pre(["find", "findOne", "updateOne", "findOneAndUpdate"], function(){
  this.populate(["scheduleId", "busId", "busManagerId"])
})

const Model = model("Trip", tripSchema);
export default Model;