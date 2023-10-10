import ITaskService from "@/application/Task/ITaskService";
import TaskService from "@/application/Task/TaskService";
import ITaskRepository from "@/domain/Task/ITaskRepository";
import TaskRepository from "@/infrastructure/repository/Task/TaskRepository";
import DataSourceManager from "@/infrastructure/repository/common/DataSourceManager";
import TaskController from "@/interface/controller/Task/TaskController";
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

export { container };
