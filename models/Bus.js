import { Schema, model } from "mongoose";

const busSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the bus name"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Please enter your last capacity"],
    },
  },
  {
    collection: "Bus",
    versionKey:false 
  }
);
const BusModel = model("Bus", busSchema);
export default  BusModel