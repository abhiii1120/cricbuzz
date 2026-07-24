import { Schema, model } from "mongoose";
import { ROLES } from "../constant/model.constant.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.SCORER,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    picture:{
      type:String,
      default:"https://px.pixxo.io/test/user.png"
    }
  },
  {
    timestamps: true,
  },
);

let userModel = model("user", userSchema);

export default userModel;
