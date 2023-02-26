import IUser from "../types/interfaces/iuser";
import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  }
});

userSchema.plugin(mongooseUniqueValidator);

const User = model<IUser>("User", userSchema);

export default User;