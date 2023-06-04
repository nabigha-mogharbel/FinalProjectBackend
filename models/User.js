import { Schema, model } from "mongoose";
import {EmailValidator} from '../validators/index.js'
import validate from "mongoose-validator";
const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    phone:{
        type:Number,
        unique:true
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "the password should contains at least 8 characters"],
      maxLength: [80, "the password should contains at max 80 characters"],
    },
    role: {
      type: String,
    },
    lineId:{
        type:Schema.Types.ObjectId,
        ref:"Line"
    }
  },
  {
    collection: "User",
  }
);
const Model = model("User", userSchema);
export default Model;