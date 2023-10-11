import { TaskDto } from "./TaskDto";
import { TaskCreateCommand } from "./TaskCreateCommand";
import { TaskUpdateCommand } from "./TaskUpdateCommand";

export default interface ITaskService {
  getAll(): Promise<TaskDto[]>;
  findById(id: number): Promise<TaskDto | undefined>;
  create(task: TaskCreateCommand): Promise<TaskDto>;
  update(task: TaskUpdateCommand): Promise<TaskDto>;
  markTaskAsCompleted(id: number): Promise<void>;
  delete(id: number): Promise<void>;
}
