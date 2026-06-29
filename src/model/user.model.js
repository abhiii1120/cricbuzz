import { Schema, model } from "mongoose";
import { lowercase } from "zod";
import { ROLES } from "../constant/model.constant";

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
      default: ROLES_SCORER,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

let userModel = model("user", userSchema);

export default userModel;
