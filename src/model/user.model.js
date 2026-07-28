import { Schema, model } from "mongoose";
import { ROLES } from "../constant/model.constant.js";
import bcrypt from 'bcrypt'

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
      default:"https://px.pixxo.io/test/user.pnghttps://res.cloudinary.com/zld78yto/image/upload/v1783615661/134996379_da7ed7b0-5f66-4f97-a610-51100d3b9fd2_srspvw.jpg"
    }
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function(userPass){
  return await bcrypt.compare(userPass,this.password);
}

let userModel = model("user", userSchema);

export default userModel;
