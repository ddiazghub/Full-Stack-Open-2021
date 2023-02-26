import { Request } from "express";

export default interface IRequestWithToken extends Request {
    token: string
}