import HttpClient from "@/infrastructure/client/HttpClient";
import HttpClientHelper from "@/infrastructure/client/HttpClientHelper";
import IHttpClient from "@/infrastructure/client/IHttpClient";
import IHttpClientHelper from "@/infrastructure/client/IHttpClientHelper";
import ITaskClient from "@/infrastructure/task/ITaskClient";
import TaskClient from "@/infrastructure/task/TaskClient";
import { Container } from "inversify";
import { TYPES } from "./types";

const container = new Container();
container
  .bind<IHttpClient>(TYPES.IHttpClient)
  .to(HttpClient)
  .inSingletonScope();
container
  .bind<IHttpClientHelper>(TYPES.IHttpClientHelper)
  .to(HttpClientHelper)
  .inSingletonScope();
container
  .bind<ITaskClient>(TYPES.ITaskClient)
  .to(TaskClient)
  .inSingletonScope();

export { container };
