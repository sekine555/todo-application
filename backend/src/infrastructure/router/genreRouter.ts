import express from "express";
import { StatusCodes } from "http-status-codes";
import { container } from "@/config/inversify.config";
import { TYPES } from "@/config/types";
import GenreController from "@/interface/controller/Genre/GenreController";

export const createGenreRouter = () => {
  const router = express.Router();
  const genreController = container.get<GenreController>(TYPES.GenreController);

  router.get("/genres", async (_, res, next) => {
    try {
      const result = await genreController.getGenres();
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
