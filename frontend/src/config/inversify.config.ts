import HttpClient from "@/infrastructure/client/HttpClient";
import HttpClientHelper from "@/infrastructure/client/HttpClientHelper";
import IHttpClient from "@/infrastructure/client/IHttpClient";
import IHttpClientHelper from "@/infrastructure/client/IHttpClientHelper";
import ITaskClient from "@/infrastructure/task/ITaskClient";
import TaskClient from "@/infrastructure/task/TaskClient";
import IGenreClient from "@/infrastructure/genre/IGenreClient";
import GenreClient from "@/infrastructure/genre/GenreClient";
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
container
  .bind<IGenreClient>(TYPES.IGenreClient)
  .to(GenreClient)
  .inSingletonScope();

export { container };
