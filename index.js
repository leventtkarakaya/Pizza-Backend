const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const DB = require("./Config/DataBase");

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

const authRouter = require("./Routers/AuthRouter");
const pizzaRouter = require("./Routers/FoodRouter");

app.use("/api/auth", authRouter);
app.use("/api/pizza", pizzaRouter);

DB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
