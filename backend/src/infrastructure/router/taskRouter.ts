import express from "express";
import { StatusCodes } from "http-status-codes";
import { container } from "@/config/inversify.config";
import { TYPES } from "@/config/types";
import TaskController from "@/interface/controller/Task/TaskController";

export const createTaskRouter = () => {
  const router = express.Router();
  const taskController = container.get<TaskController>(TYPES.TaskController);

  router.get("/tasks", async (_, res, next) => {
    try {
      const result = await taskController.getTasks();
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
