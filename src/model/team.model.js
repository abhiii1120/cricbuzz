import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    primaryColor: String,
    teamPlayers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    isDeleted: {
      type: String,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      types: Schema.types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const teamModel = model("Team", teamSchema);

export default teamModel;
