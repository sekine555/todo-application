import {
  TaskCreateRequest,
  TaskDeleteRequest,
  TaskUpdateRequest,
} from "@/types/API/task/TaskRequest";
import { TaskResponse } from "@/types/API/task/TaskResponse";

interface ITaskClient {
  fetchTasks(): Promise<TaskResponse[]>;
  findTaskById(taskId: number): Promise<TaskResponse>;
  createTask(request: TaskCreateRequest): Promise<TaskResponse>;
  updateTask(request: TaskUpdateRequest): Promise<TaskResponse>;
  deleteTask(request: TaskDeleteRequest): Promise<void>;
}

export default ITaskClient;
