import { Schema, model } from "mongoose";
import { PLAYER_ROLES } from "../constant/model.constant.js";

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
     role: {
      type: String,
      enum: Object.values(PLAYER_ROLES),
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    battingStyle: {
      type: String,
    },
    bowlingStyle: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const playerModel = model("Player",playerSchema);
export default playerModel;