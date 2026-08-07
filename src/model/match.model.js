import { model, Schema } from "mongoose";
import { MATCH_STATUS, TOSS_DECESSION } from "../constant/model.constant.js";

const playingPLayerSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    isCaption: {
      type: Boolean,
      default: false,
    },
    isWicketKeeper: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const matchSchema = new Schema({
  seriesId: {
    type: Schema.Types.ObjectId,
    ref: "Series",
    required: true,
  },
  matchNumber: {
    type: String,
  },
  venue: { type: String, required: true, trim: true },
  startTime: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(MATCH_STATUS),
    default: MATCH_STATUS.UPCOMING,
  },
  team1: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  team2: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  tossWinner: { type: Schema.Types.ObjectId, ref: "Team" },
  tossDecision: { type: String, enum: Object.values(TOSS_DECESSION) },
  playingXI: {
    team1: [playingPLayerSchema],
    team2: [playingPLayerSchema],
  },
  winner: { type: Schema.Types.ObjectId, ref: "Team" },
  result: String,
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

matchSchema.index({ status: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ seriesId: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ team1: 1, startTime: -1, isDeleted: 1 });
matchSchema.index({ team2: 1, startTime: -1, isDeleted: 1 });

const matchModel = model("Match", matchSchema);

export default matchModel;