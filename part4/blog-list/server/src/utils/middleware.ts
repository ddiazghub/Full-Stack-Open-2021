import { NextFunction, Request, Response } from "express";
import IRequestWithToken from "../types/interfaces/irequestwithtoken";
import logger from "./logger";

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const authHeader: string[] = req.headers.authorization.split(" ");
    
    if (authHeader[0].toLowerCase() === "bearer") {
      (req as IRequestWithToken).token = authHeader[1];
    }
  }

  next();
};

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(error.message);

  switch (error.name) {
    case "CastError":
      res.status(400).send({ error: "Malformed Id" });
      break;
    
    case "ValidationError":
      res.status(400).send({ error: error.message });
      break;
    
    case "NotFoundError":
      res.sendStatus(404);
      break;
    
    case "UnauthorizedError":
      res.status(401).send({ error: error.message });
      break;
    
    case "ForbiddenError":
      res.status(403).send({ error: error.message });
      break;
    
    default:
      res.sendStatus(500);
  }
}

export default {
  errorHandler,
  tokenExtractor
};