import ITaskService from "@/application/Task/ITaskService";
import TaskService from "@/application/Task/TaskService";
import ITaskRepository from "@/domain/Task/ITaskRepository";
import TaskRepository from "@/infrastructure/repository/Task/TaskRepository";
import IGenreService from "@/application/Genre/IGenreService";
import GenreService from "@/application/Genre/GenreService";
import IGenreRepository from "@/domain/Genre/IGenreRepository";
import GenreRepository from "@/infrastructure/repository/Genre/GenreRepository";
import DataSourceManager from "@/infrastructure/repository/common/DataSourceManager";
import TaskController from "@/interface/controller/Task/TaskController";
import GenreController from "@/interface/controller/Genre/GenreController";
import { dataSource } from "./typeorm.config";
import { Container } from "inversify";
import { TYPES } from "./types";

const container = new Container();

container
  .bind<DataSourceManager>(TYPES.DataSourceManager)
  .toDynamicValue(() => new DataSourceManager(dataSource))
  .inSingletonScope();
container
  .bind<ITaskRepository>(TYPES.ITaskRepository)
  .to(TaskRepository)
  .inSingletonScope();
container
  .bind<ITaskService>(TYPES.ITaskService)
  .to(TaskService)
  .inSingletonScope();
container
  .bind<TaskController>(TYPES.TaskController)
  .to(TaskController)
  .inSingletonScope();
container
  .bind<IGenreRepository>(TYPES.IGenreRepository)
  .to(GenreRepository)
  .inSingletonScope();
container
  .bind<IGenreService>(TYPES.IGenreService)
  .to(GenreService)
  .inSingletonScope();
container
  .bind<GenreController>(TYPES.GenreController)
  .to(GenreController)
  .inSingletonScope();

export { container };
