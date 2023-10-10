import express from "express";
import { createTaskRouter } from "./taskRouter";

export const createRouter = () => {
  const router = express.Router();

  router.use(createTaskRouter());

  return router;
};
