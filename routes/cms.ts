import express, { Router } from "express";
const { getAllCMS, getCMS, addCMS, updateCMS, deleteCMS } = require("../controller/cms");
const { MONGODB_DB = "cms_db", MONGODB_COLLECTION = "records" } = process.env;
const route = Router();

route.get("/record/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const result = await getCMS(MONGODB_DB, MONGODB_COLLECTION, id);
  return res.send(result);
});

route.get("/records/", async (req: express.Request, res: express.Response) => {
  const default_options = {
    skip: req.body.skip || 0,
    limit: req.body.limit && req.body.limit < 500 ? req.body.limit : 50,
  };
  const result = await getAllCMS(MONGODB_DB, MONGODB_COLLECTION, default_options);
  console.log(req.body.limit, req.body.skip, "HELLO");
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
  const result = await addCMS(MONGODB_DB, MONGODB_COLLECTION, params);

  return res.send(result);
});

route.put("/record/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const params = {
    id,
    ...req.body,
  };

  const result = await updateCMS(MONGODB_DB, MONGODB_COLLECTION, params);
  res.send(result);
});

route.delete("/record/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const result = await deleteCMS(MONGODB_DB, MONGODB_COLLECTION, id);
  res.send(result);
});

module.exports = route;
