import { TaskEntity } from "@/infrastructure/entity/TaskEntity";
import { BaseMySqlOperations } from "../common/BaseMySqlOperations";
import { EntityManager } from "typeorm";

export class TaskOperations extends BaseMySqlOperations<TaskEntity> {
  constructor() {
    super(TaskEntity);
  }

  public async fetchTasksCreatedDesc(
    entityManager: EntityManager
  ): Promise<TaskEntity[]> {
    const response = await this.fetchAll(entityManager, {
      order: {
        createdAt: "DESC",
      },
    });
    return response;
  }

  public async saveTask(
    entityManager: EntityManager,
    taskEntity: TaskEntity
  ): Promise<TaskEntity> {
    const repository = await this.getRepository(entityManager);
    return await repository.save(taskEntity);
  }

  public async deleteTask(
    entityManager: EntityManager,
    taskId: number
  ): Promise<void> {
    const repository = await this.getRepository(entityManager);
    await repository.delete(taskId);
  }
}
