import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import IGenreService from "./IGenreService";
import { GenreDto } from "./GenreDto";
import IGenreRepository from "@/domain/Genre/IGenreRepository";

@injectable()
class GenreService implements IGenreService {
  private _genreRepository: IGenreRepository;

  constructor(
    @inject(TYPES.IGenreRepository)
    genreRepository: IGenreRepository
  ) {
    this._genreRepository = genreRepository;
  }

  public async getAll(): Promise<GenreDto[]> {
    const genres = await this._genreRepository.fetchAll();
    return genres.map((genre) => new GenreDto(genre));
  }
}

export default GenreService;
