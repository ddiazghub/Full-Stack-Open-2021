import config from "./utils/config";
import http, { Server } from "http";
import app from "./app";
import logger from "./utils/logger";

const server: Server = http.createServer(app);

server.listen(config.PORT, () => {
    logger.out(`Server running on port ${config.PORT}`);
});