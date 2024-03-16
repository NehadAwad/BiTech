import express from "express";
import errorHandler from "./middlewares/errorHandler";
import logger from "./util/winston";
import config from "./settings/config";
import { createConnectionAndInitialize } from "./database/createConnection";
require("dotenv").config();
require("express-async-errors");

const app = express();
const http = require("http").Server(app);

createConnectionAndInitialize(config.dbUrl)
    .then(() => {
        logger.info('db conntected');
    })
    .catch((err) => {
        logger.error(err);
        process.exit(1);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "200mb" }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader("Access-Control-Allow-Headers", "*");

    next();
});

// send override to log response body
const originalSend = app.response.send;
(app as any).response.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.responseBody = body;
};

import userRouter from "./router/user"
app.use("/api", userRouter);

app.get("/ping", (req, res) => {
    return res.status(200).json({ message: "PING PONG" });
});

app.use(errorHandler);

export default http;
