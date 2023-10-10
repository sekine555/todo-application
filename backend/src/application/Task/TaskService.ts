import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import ITaskService from "./ITaskService";
import { TaskDto } from "./TaskDto";
import { TaskSaveCommand } from "./TaskSaveCommand";
import ITaskRepository from "@/domain/Task/ITaskRepository";

@injectable()
class TaskService implements ITaskService {
  private _taskRepository: ITaskRepository;

  constructor(
    @inject(TYPES.ITaskRepository)
    taskRepository: ITaskRepository
  ) {
    this._taskRepository = taskRepository;
  }

  public async getAll(): Promise<TaskDto[]> {
    const tasks = await this._taskRepository.fetchAll();
    return tasks.map((task) => new TaskDto(task));
  }

  findById(id: number): Promise<TaskDto> {
    throw new Error("Method not implemented.");
  }
  create(task: TaskSaveCommand): Promise<TaskDto> {
    throw new Error("Method not implemented.");
  }
  update(task: TaskSaveCommand): Promise<TaskDto> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default TaskService;
