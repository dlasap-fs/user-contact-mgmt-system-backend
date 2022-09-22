import express, { Router } from "express";
const { getAllCMS, addCMS } = require("../controller/cms");
const { DB = "cms_db", DB_COLLECTION = "records" } = process.env;
const route = Router();

route.get("/records", async (req: express.Request, res: express.Response) => {
  const result = await getAllCMS(DB, DB_COLLECTION);
  return res.send(result);
});
