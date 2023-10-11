import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import ITaskService from "./ITaskService";
import { TaskDto } from "./TaskDto";
import { TaskCreateCommand } from "./TaskCreateCommand";
import { TaskUpdateCommand } from "./TaskUpdateCommand";
import ITaskRepository from "@/domain/Task/ITaskRepository";
import { Status } from "@/domain/Task/Status";

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

  public async findById(id: number): Promise<TaskDto> {
    const task = await this._taskRepository.fetchById(id);
    return new TaskDto(task);
  }

  public async create(task: TaskCreateCommand): Promise<TaskDto> {
    const newTask = await this._taskRepository.create(task);
    return new TaskDto(newTask);
  }

  public async update(task: TaskUpdateCommand): Promise<TaskDto> {
    const updatedTask = await this._taskRepository.update(task);
    return new TaskDto(updatedTask);
  }

  public async markTaskAsCompleted(id: number): Promise<void> {
    // タスク完了させるため、ステータスを1を渡す
    await this._taskRepository.updateTaskStatus(id, new Status(1));
  }

  public async delete(id: number): Promise<void> {
    await this._taskRepository.delete(id);
  }
}

export default TaskService;
