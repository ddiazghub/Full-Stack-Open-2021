import IBlog from "../types/interfaces/iblog";
import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

blogSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;