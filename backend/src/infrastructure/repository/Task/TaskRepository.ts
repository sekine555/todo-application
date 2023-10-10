import { TaskSaveCommand } from "@/application/Task/TaskSaveCommand";
import ITaskRepository from "@/domain/Task/ITaskRepository";
import { Task } from "@/domain/Task/Task";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "@/config/types";
import DataSourceManager from "../common/DataSourceManager";
import { TaskOperations } from "./TaskOperations";

@injectable()
class TaskRepository implements ITaskRepository {
  private _dataSourceManager: DataSourceManager;
  private _taskOperations: TaskOperations;

  constructor(
    @inject(TYPES.DataSourceManager)
    dataSourceManager: DataSourceManager
  ) {
    this._dataSourceManager = dataSourceManager;
    this._taskOperations = new TaskOperations();
  }

  public async fetchAll(): Promise<Task[]> {
    try {
      const db = await this._dataSourceManager.initialize();
      const taskEntities = await db.transaction(async (txManager) => {
        return await this._taskOperations.fetchTasksCreatedDesc(txManager);
      });
      return taskEntities.map((taskEntity) => new Task(taskEntity));
    } catch (error) {
      throw error;
    } finally {
      await this._dataSourceManager.destroy();
    }
  }

  fetchById(id: number): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  create(task: TaskSaveCommand): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  update(task: TaskSaveCommand): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default TaskRepository;
