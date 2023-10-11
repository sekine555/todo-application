import { TaskResponse } from "@/types/API/task/TaskResponse";

interface ITaskClient {
  fetchTasks(): Promise<TaskResponse[]>;
  findTaskById(taskId: number): Promise<TaskResponse>;
}

export default ITaskClient;
