import express, { Router } from "express";
const { getAllCMS, addCMS } = require("../controller/cms");
const { DB = "cms_db", DB_COLLECTION = "records" } = process.env;
const route = Router();

route.get("/records", async (req: express.Request, res: express.Response) => {
  const result = await getAllCMS(DB, DB_COLLECTION);
  return res.send(result);
});

route.post("/record", async (req: express.Request, res: express.Response) => {
  const { first_name, last_name, delivery_address } = req.body;

  const params = {
    first_name,
    last_name,
    delivery_address,
    created_date: new Date(),
    updated_date: new Date(),
  };
  const result = await addCMS(DB, DB_COLLECTION, params);

  return res.send(result);
});

module.exports = route;
