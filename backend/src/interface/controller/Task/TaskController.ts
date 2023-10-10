import ITaskService from "@/application/Task/ITaskService";
import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TaskResponse } from "./TaskResponse";

@injectable()
class TaskController {
  private _taskService: ITaskService;

  constructor(
    @inject(TYPES.ITaskService)
    taskService: ITaskService
  ) {
    this._taskService = taskService;
  }

  public async getTasks(): Promise<TaskResponse[]> {
    const taskDtos = await this._taskService.getAll();
    return taskDtos.map((taskDto) => new TaskResponse(taskDto));
  }
}

export default TaskController;
