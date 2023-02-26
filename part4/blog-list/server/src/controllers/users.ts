import { Router, Request, Response } from "express";
import IUser from "../types/interfaces/iuser";
import User from "../models/user";
import * as bcrypt from "bcrypt";
import ValidationError from "../types/classes/ValidationError";

const usersRouter: Router = Router();

usersRouter.get("/", async (request: Request, response: Response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1, id: 1 });

  return response.json(users);
});

usersRouter.post("/", async (request: Request, response: Response) => {
  const newUser: IUser = { ...request.body as IUser };

  if (!newUser.password)
    throw new ValidationError("Missing field \"password\"");
  else if (newUser.password.length < 3)
    throw new ValidationError("Password must have a length of at least 3 characters");
  
  newUser.passwordHash = await bcrypt.hash(newUser.password, 10);
  newUser.password = undefined;
  const result = await new User(newUser).save();

  return response.status(201).json(result);
});

export default usersRouter;