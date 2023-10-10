import { TaskDto } from "./TaskDto";
import { TaskSaveCommand } from "./TaskSaveCommand";

export default interface ITaskService {
  getAll(): Promise<TaskDto[]>;
  findById(id: number): Promise<TaskDto | undefined>;
  create(task: TaskSaveCommand): Promise<TaskDto>;
  update(task: TaskSaveCommand): Promise<TaskDto>;
  delete(id: number): Promise<void>;
}
