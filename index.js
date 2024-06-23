const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const DB = require("./Config/DataBase");
dotenv.config();

const app = express();

DB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
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

app.use("/api/auth", authRouter);
app.use("/api/pizza", pizzaRouter);
app.use("/api/v1/image", imageRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
