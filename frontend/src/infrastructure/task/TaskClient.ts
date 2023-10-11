import { TYPES } from "@/config/types";
import type IHttpClient from "@/infrastructure/client/IHttpClient";
import { validateObject } from "@/utils/validateObject";
import { getDefaultRequestInit } from "../helpers/requestInit";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import ITaskClient from "./ITaskClient";
import { GetTaskResponse, TaskResponse } from "@/types/API/task/TaskResponse";
import {
  TaskCreateRequest,
  TaskUpdateRequest,
  TaskDeleteRequest,
} from "@/types/API/task/TaskRequest";

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

  public async createTask(request: TaskCreateRequest): Promise<TaskResponse> {
    return await this.client
      .post<TaskResponse>("/api/v1/tasks", request, getDefaultRequestInit())
      .then((res) => {
        const getTaskResponse = new GetTaskResponse(res.data);
        return validateObject(getTaskResponse);
      });
  }
  public async updateTask(request: TaskUpdateRequest): Promise<TaskResponse> {
    // リクエストのオブジェクトからidとそれ以外のプロパティーを分割代入で取り出す
    const { id, ...taskData } = request;
    return await this.client
      .put<TaskResponse>(
        `/api/v1/tasks/${id}`,
        taskData,
        getDefaultRequestInit(),
      )
      .then((res) => {
        const getTaskResponse = new GetTaskResponse(res.data);
        return validateObject(getTaskResponse);
      });
  }
  public async deleteTask(request: TaskDeleteRequest): Promise<void> {
    await this.client
      .delete<void>(`/api/v1/tasks/${request.id}`, getDefaultRequestInit())
      .then((res) => {
        return res.data;
      });
  }
}

export default TaskClient;
