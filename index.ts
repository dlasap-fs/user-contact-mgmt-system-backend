import express, { Response } from "express";
import http from "http";
import cors from "cors";
require("dotenv").config();
const cms = require("./routes/cms");
// const { PORT = "8080" } = process.env;
const app = express();

app.use(express.json(), cors(), cms);
app.get("/", (_, response: Response) => {
  console.log("Someone just visited the home page.");
  response.send("Welcome to my BackEnd Application Using NodeJS w/ ExpressJS.");
});

app.get("*", (_, response: Response) => {
  response.status(404).send("Page Not Found.");
});

const server = http.createServer(app);
server.listen(process.env.PORT || 8080, () => {
  console.log("Server listening to port :", process.env.PORT);
});
