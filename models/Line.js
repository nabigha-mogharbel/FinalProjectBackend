import { Schema, model } from "mongoose";

const lineSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the line name"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter the trip price"],
    },
    busStops: [{
      name:{
        type:String,
        require:true,
        trim:true
      },
      lon:{
        type:Number
      },
      lat:{
        type:Number
      }
    }]
    
  },
  {
    collection: "Line",
  }
);
const Model = model("Line", lineSchema);
export default Model;