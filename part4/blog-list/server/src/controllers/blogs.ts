import { Router, Request, Response } from "express";
import IBlog from "../types/interfaces/iblog";
import IUser from "../types/interfaces/iuser";
import Blog from "../models/blog";
import User from "../models/user";
import NotFoundError from "../types/classes/NotFoundError";
import { loginRequired } from "../utils/app_helpers";
import * as jwt from "jsonwebtoken";
import config from "../utils/config";
import IUserToken from "../types/interfaces/iusertoken";
import ForbiddenError from "../types/classes/ForbiddenError";
import UnauthorizedError from "../types/classes/UnauthorizedError";

const blogsRouter: Router = Router();

blogsRouter.get("/", async (request: Request, response: Response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1, id: 1 });
  return response.json(blogs);
});

blogsRouter.post("/", async (request: Request, response: Response) => {
  const user = await loginRequired(request);

  if (!user)
    return;

  const blog = new Blog({ ...request.body as IBlog, user: user._id });
  const result = await blog.save();
  user.blogs.push(blog._id);
  
  await User.findByIdAndUpdate(user._id, { blogs: user.blogs });

  return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request: Request, response: Response) => {
  const user = await loginRequired(request);
  const blog = await Blog.findById(request.params.id);

  if (!blog)
    throw new NotFoundError();
  
  if (user._id.toString() !== blog.user.toString()) {
    throw new ForbiddenError("Blogs can only be deleted by the same user that created them");
  }

  user.blogs.filter(b => b.toString() !== blog._id.toString());
  await blog.delete();

  return response.sendStatus(204);
});

blogsRouter.put("/:id", async (request: Request, response: Response) => {
  const user = await loginRequired(request);
  const blog = await Blog.findById(request.params.id);

  if (!blog)
    throw new NotFoundError();

  if (user._id.toString() !== blog.user.toString()) {
    throw new ForbiddenError("Blogs can only be updated by the same user that created them");
  }

  const result = await Blog.findByIdAndUpdate(blog.id, { likes: request.body.likes }, { new: true });

  return response.status(201)
    .send(result);
});

export default blogsRouter;