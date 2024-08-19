const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const DB = require("./Config/DataBase");

dotenv.config();

const app = express();

DB();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
    maxAge: 3600,
  })
);
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authRouter = require("./Routers/AuthRouter");
const pizzaRouter = require("./Routers/FoodRouter");
const imageRouter = require("./Routers/ImageRouter");
const orderRouter = require("./Routers/Order");

app.use("/api/auth", authRouter);
app.use("/api/pizza", pizzaRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
