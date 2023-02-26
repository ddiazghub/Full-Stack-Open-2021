import express, { Application, NextFunction, Request, Response } from "express";
import { connect, connection } from "mongoose";
require("express-async-errors");
import cors from "cors";
import config from "./utils/config";
import blogsRouter from "./controllers/blogs";
import middleware from "./utils/middleware";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";

if (!config.MONGODB_URL) {
    console.log("Missing \"MONGODB_URL\" env variable");
    process.exit(0);
}
  
connect(config.MONGODB_URL);

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor as (req: Request, res: Response, next: NextFunction) => void);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

app.on("close", () => {
    if (connection)
        connection.close();
});

export default app;