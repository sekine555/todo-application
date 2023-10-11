import { TaskCreateCommand } from "@/application/Task/TaskCreateCommand";
import { TaskUpdateCommand } from "@/application/Task/TaskUpdateCommand";
import ITaskRepository from "@/domain/Task/ITaskRepository";
import { Task } from "@/domain/Task/Task";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "@/config/types";
import DataSourceManager from "../common/DataSourceManager";
import { TaskOperations } from "./TaskOperations";
import { TaskEntity } from "@/infrastructure/entity/TaskEntity";
import DatabaseOperationException from "@/domain/Error/exception/DatabaseOperationException";
import { Status } from "@/domain/Task/Status";

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
      throw new DatabaseOperationException(
        `@TaskRepository >>> fetchAll error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }

  public async fetchById(id: number): Promise<Task> {
    try {
      const db = await this._dataSourceManager.initialize();
      const taskEntity = await db.transaction(async (txManager) => {
        return await this._taskOperations.fetchTaskById(txManager, id);
      });
      return new Task(taskEntity);
    } catch (error) {
      throw new DatabaseOperationException(
        `@TaskRepository >>> fetchById error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }

  public async create(task: TaskCreateCommand): Promise<Task> {
    try {
      const db = await this._dataSourceManager.initialize();
      const newTaskEntity = new TaskEntity();
      newTaskEntity.genreId = task.genreId;
      newTaskEntity.name = task.name;
      newTaskEntity.status = task.status.getValue();
      const savedTaskEntity = await db.transaction(async (txManager) => {
        return await this._taskOperations.saveTask(txManager, newTaskEntity);
      });
      return new Task(savedTaskEntity);
    } catch (error) {
      throw new DatabaseOperationException(
        `@TaskRepository >>> create error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }

  public async update(task: TaskUpdateCommand): Promise<Task> {
    try {
      const db = await this._dataSourceManager.initialize();
      const taskEntity = new TaskEntity();
      taskEntity.id = task.id;
      taskEntity.genreId = task.genreId;
      taskEntity.name = task.name;
      taskEntity.status = task.status.getValue();
      const savedTaskEntity = await db.transaction(async (txManager) => {
        return await this._taskOperations.saveTask(txManager, taskEntity);
      });
      return new Task(savedTaskEntity);
    } catch (error) {
      throw new DatabaseOperationException(
        `@TaskRepository >>> update error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }

  public async updateTaskStatus(id: number, status: Status): Promise<void> {
    try {
      const db = await this._dataSourceManager.initialize();
      await db.transaction(async (txManager) => {
        await this._taskOperations.updateTaskStatus(
          txManager,
          id,
          status.getValue()
        );
      });
    } catch (error) {
      throw new DatabaseOperationException(
        `@TaskRepository >>> updateTaskStatus error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const db = await this._dataSourceManager.initialize();
      await db.transaction(async (txManager) => {
        await this._taskOperations.deleteTask(txManager, id);
      });
    } catch (error) {
      throw new DatabaseOperationException(
        `@TaskRepository >>> delete error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }
}

export default TaskRepository;
