import { Router, Request, Response } from "express";
import User from "../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ICredentials from "../types/interfaces/icredentials";
import UnauthorizedError from "../types/classes/UnauthorizedError";
import config from "../utils/config";
import logger from "../utils/logger";
import IUserToken from "../types/interfaces/iusertoken";

const loginRouter: Router = Router();

loginRouter.post("/", async (request: Request, response: Response) => {
  const credentials: ICredentials = { ...request.body as ICredentials };
  const user = await User.findOne({ username: credentials.username });

  if (!user || !credentials.password || !(await bcrypt.compare(credentials.password, user.passwordHash!))) {
    throw new UnauthorizedError("Invalid username and/or password");
  }

  const userForToken: IUserToken = {
    id: user._id,
    username: user.username
  };

  const token = jwt.sign(userForToken, config.SECRET);

  return response.status(200)
    .send({
      token,
      username: user.username,
      name: user.name
    });
});

export default loginRouter;