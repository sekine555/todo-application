import { GenreEntity } from "@/infrastructure/entity/GenreEntity";
import { BaseMySqlOperations } from "../common/BaseMySqlOperations";
import { EntityManager } from "typeorm";

export class GenreOperations extends BaseMySqlOperations<GenreEntity> {
  constructor() {
    super(GenreEntity);
  }

  public async fetchAllGenres(
    entityManager: EntityManager
  ): Promise<GenreEntity[]> {
    const response = await this.fetchAll(entityManager, {
      order: {
        id: "ASC",
      },
    });
    return response;
  }
}
