import { createLogger, format, transports } from "winston";
require("dotenv").config();

const { prettyPrint } = format;

const logger = createLogger({
    level: "debug",
    format: format.combine(format.json(), prettyPrint()),
    transports: [
        new transports.Console(),
    ],
    exitOnError: false,
    handleExceptions: true,
});

export default logger;