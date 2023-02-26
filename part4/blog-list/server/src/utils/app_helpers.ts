import { Request } from "express"
import IRequestWithToken from "../types/interfaces/irequestwithtoken";
import UnauthorizedError from "../types/classes/UnauthorizedError";
import IUserToken from "../types/interfaces/iusertoken";
import * as jwt from "jsonwebtoken";
import config from "./config";
import User from "../models/user";
import { Document } from "mongoose";
import IUser from "../types/interfaces/iuser";

export const loginRequired = async (request: Request): Promise<Document<IUser> & IUser & { _id: string }> => {
    const req = request as IRequestWithToken;

    if (!req.token) {
        throw new UnauthorizedError("Action requires authentication");
    }

    const token = jwt.verify(req.token, config.SECRET) as IUserToken;

    return (await User.findById(token.id))!;
}