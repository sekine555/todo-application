import { TaskSaveCommand } from "@/application/Task/TaskSaveCommand";
import { Task } from "./Task";

export default interface ITaskRepository {
  fetchAll(): Promise<Task[]>;
  fetchById(id: number): Promise<Task | undefined>;
  create(task: TaskSaveCommand): Promise<Task>;
  update(task: TaskSaveCommand): Promise<Task>;
  delete(id: number): Promise<void>;
}
