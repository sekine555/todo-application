import { TYPES } from "@/config/types";
import type IHttpClient from "@/infrastructure/client/IHttpClient";
import { validateObject } from "@/utils/validateObject";
import { getDefaultRequestInit } from "../helpers/requestInit";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import ITaskClient from "./ITaskClient";
import { GetTaskResponse, TaskResponse } from "@/types/API/task/TaskResponse";

@injectable()
class TaskClient implements ITaskClient {
  private client: IHttpClient;

  constructor(
    @inject(TYPES.IHttpClient)
    client: IHttpClient,
  ) {
    this.client = client;
  }

  public async fetchTasks(): Promise<TaskResponse[]> {
    return await this.client
      .get<TaskResponse[]>("/api/v1/tasks", getDefaultRequestInit())
      .then((res) => {
        return Promise.all(
          res.data.map((taskResponse) => {
            const getTaskResponse = new GetTaskResponse(taskResponse);
            return validateObject(getTaskResponse);
          }),
        );
      });
  }

  public async findTaskById(taskId: number): Promise<TaskResponse> {
    return await this.client
      .get<TaskResponse>(`/api/v1/tasks/${taskId}`, getDefaultRequestInit())
      .then((res) => {
        const getTaskResponse = new GetTaskResponse(res.data);
        return validateObject(getTaskResponse);
      });
  }
}

export default TaskClient;
