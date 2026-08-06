import { Schema, model } from "mongoose";
import { COMMENTARY_TYPE } from "../constant/model.constant.js";

const commentarySchema = new Schema(
  {
    matchId: { type: Schema.Types.ObjectId, ref: "Match", required: true },
    over: { type: Number, required: true, min: 0 },
    ball: { type: Number, required: true, min: 1, max: 6 },
    text: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: Object.values(COMMENTARY_TYPE),
      default: COMMENTARY_TYPE.NORMAL,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

commentarySchema.index({ matchId: 1, createdAt: -1 });

const commentaryModel = model("Commentary", commentarySchema);

export default commentaryModel;
