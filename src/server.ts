import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./middleware/Logging";
import boardRouter from "./routes/board.route";
import columnRouter from "./routes/column.route";
import cardRouter from "./routes/card.route";
import { HttpStatusCode } from "./utils/constants";
import { ColumnModel } from "./models/column.model";

const app = express();

//** Connect mongoose */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        Logging.info("Connected to mongoDB !!!");
        StartServer();
    })
    .catch((err) => {
        Logging.error("Unable to connect: ");
        Logging.error(err);
    });

//** Only start server when mongoDB Connected */
const StartServer = () => {
    console.log(ColumnModel);
    app.use((req, res, next) => {
        //** Log request */
        Logging.info(
            `Incoming -> Method: [${req.method}] -> URL: [${req.url}] -> IP: [${req.socket.remoteAddress}]`
        );

        res.on("finish", () => {
            Logging.info(
                `Incoming -> Method: [${req.method}] -> URL: [${req.url}] -> IP: [${req.socket.remoteAddress}] -> Status: [${res.statusCode}]`
            );
        });

        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //** Rule of our API */
    app.use((req, res, next) => {
        res.header("Access-Control-Alow-Origin", "*");
        res.header(
            "Access-Control-Alow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method == "OPTIONS") {
            res.header(
                "Access-Control-Alow-Method",
                "PUT, POST, PATCH, GET, DELETE"
            );
            return res.status(HttpStatusCode.OK).json({});
        }
        next();
    });

    //** Routes */

    // Board
    app.use("/api/board", boardRouter);
    // Column
    app.use("/api/column", columnRouter);
    // Card
    app.use("/api/card", cardRouter);

    //** HealthCheck */
    app.get("/test", (req, res, next) =>
        res.status(HttpStatusCode.OK).json({ message: "ting" })
    );
    //** Error handing */
    app.use((req, res, next) => {
        const error = new Error("Not found");
        Logging.error(error);

        return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () =>
        Logging.info(`Server is running on port ${config.server.port}`)
    );
};
