import express from "express";
import { createTaskRouter } from "./taskRouter";
import { createGenreRouter } from "./genreRouter";

export const createRouter = () => {
  const router = express.Router();

  router.use(createTaskRouter());
  router.use(createGenreRouter());

  return router;
};
