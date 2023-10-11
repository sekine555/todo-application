import IGenreRepository from "@/domain/Genre/IGenreRepository";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "@/config/types";
import DataSourceManager from "../common/DataSourceManager";
import { GenreOperations } from "./GenreOperations";
import { Genre } from "@/domain/Genre/Genre";
import DatabaseOperationException from "@/domain/Error/exception/DatabaseOperationException";

@injectable()
class GenreRepository implements IGenreRepository {
  private _dataSourceManager: DataSourceManager;
  private _genreOperations: GenreOperations;

  constructor(
    @inject(TYPES.DataSourceManager)
    dataSourceManager: DataSourceManager
  ) {
    this._dataSourceManager = dataSourceManager;
    this._genreOperations = new GenreOperations();
  }

  public async fetchAll(): Promise<Genre[]> {
    try {
      const db = await this._dataSourceManager.initialize();
      const genreEntities = await db.transaction(async (txManager) => {
        return await this._genreOperations.fetchAllGenres(txManager);
      });
      return genreEntities.map((genreEntity) => new Genre(genreEntity));
    } catch (error) {
      throw new DatabaseOperationException(
        `@GenreRepository >>> fetchAll error: ${error.message}`
      );
    } finally {
      await this._dataSourceManager.destroy();
    }
  }
}

export default GenreRepository;
