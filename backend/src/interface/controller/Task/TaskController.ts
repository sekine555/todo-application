import ITaskService from "@/application/Task/ITaskService";
import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TaskResponse } from "./TaskResponse";
import { TaskCreateRequest } from "./TaskCreateRequest";
import { TaskUpdateCommand } from "@/application/task/TaskUpdateCommand";
import { TaskCreateCommand } from "@/application/Task/TaskCreateCommand";
import { TaskUpdateRequest } from "./TaskUpdateRequest";
import { TaskIdRequest } from "./TaskIdRequest";

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

  public async getTaskById(
    taskIdRequest: TaskIdRequest
  ): Promise<TaskResponse> {
    const taskDto = await this._taskService.findById(taskIdRequest.id);
    return new TaskResponse(taskDto);
  }

  public async createTask(
    taskCreateRequest: TaskCreateRequest
  ): Promise<TaskResponse> {
    const task = new TaskCreateCommand(
      taskCreateRequest.genreId,
      taskCreateRequest.name,
      taskCreateRequest.status
    );
    const taskDto = await this._taskService.create(task);
    return new TaskResponse(taskDto);
  }

  public async updateTask(
    taskUpdateRequest: TaskUpdateRequest
  ): Promise<TaskResponse> {
    const task = new TaskUpdateCommand(
      taskUpdateRequest.id,
      taskUpdateRequest.genreId,
      taskUpdateRequest.name,
      taskUpdateRequest.status
    );
    const taskDto = await this._taskService.update(task);
    return new TaskResponse(taskDto);
  }

  public async deleteTask(taskIdRequest: TaskIdRequest): Promise<void> {
    await this._taskService.delete(taskIdRequest.id);
  }
}

export default TaskController;
