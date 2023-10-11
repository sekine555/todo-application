import express from "express";
import { StatusCodes } from "http-status-codes";
import { container } from "@/config/inversify.config";
import { TYPES } from "@/config/types";
import TaskController from "@/interface/controller/Task/TaskController";
import { TaskCreateRequest } from "@/interface/controller/Task/TaskCreateRequest";
import { TaskUpdateRequest } from "@/interface/controller/Task/TaskUpdateRequest";
import { TaskIdRequest } from "@/interface/controller/Task/TaskIdRequest";
import { validate } from "@/infrastructure/middleware/validate";

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

  router.get(
    "/tasks/:id",
    validate(TaskIdRequest, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await taskController.getTaskById(new TaskIdRequest(id));
        res.status(StatusCodes.OK).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post("/tasks", validate(TaskCreateRequest), async (req, res, next) => {
    try {
      const { genreId, name, status } = req.body;
      const taskCreateRequest = new TaskCreateRequest(genreId, name, status);
      const result = await taskController.createTask(taskCreateRequest);
      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/tasks/:id",
    validate(TaskIdRequest, "params"),
    validate(TaskUpdateRequest, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const { genreId, name, status } = req.body;
        const taskUpdateRequest = new TaskUpdateRequest(genreId, name, status);
        const result = await taskController.updateTask(
          new TaskIdRequest(id),
          taskUpdateRequest
        );
        res.status(StatusCodes.OK).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/tasks/:id",
    validate(TaskIdRequest, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        await taskController.deleteTask(new TaskIdRequest(id));
        res.status(StatusCodes.NO_CONTENT).send();
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};
