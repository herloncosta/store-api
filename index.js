import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/client.route.js";
import productsRouter from "./routes/product.route.js";
import suppliersRouter from "./routes/supplier.route.js";
import salesRouter from "./routes/sale.route.js";

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, label }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// geração de logs
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "store-api.log" }),
    ],
    format: combine(label({ label: "store-api" }), timestamp(), logFormat),
});

// configurações
const app = express();
app.use(express.json());
app.use(cors());

// rotas
app.use("/client", clientsRouter);
app.use("/product", productsRouter);
app.use("/supplier", suppliersRouter);
app.use("/sale", salesRouter);

// tratamento de erro em todas as rotas
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

app.listen(3000, () => console.log("API Started!"));
