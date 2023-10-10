import { TaskCreateCommand } from "@/application/Task/TaskCreateCommand";
import { TaskUpdateCommand } from "@/application/Task/TaskUpdateCommand";
import { Task } from "./Task";

export default interface ITaskRepository {
  fetchAll(): Promise<Task[]>;
  fetchById(id: number): Promise<Task>;
  create(task: TaskCreateCommand): Promise<Task>;
  update(task: TaskUpdateCommand): Promise<Task>;
  delete(id: number): Promise<void>;
}
