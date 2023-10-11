import IGenreService from "@/application/Genre/IGenreService";
import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GenreResponse } from "./GenreResponse";

@injectable()
class GenreController {
  private _genreService: IGenreService;

  constructor(
    @inject(TYPES.IGenreService)
    genreService: IGenreService
  ) {
    this._genreService = genreService;
  }

  public async getGenres(): Promise<GenreResponse[]> {
    const genreDtos = await this._genreService.getAll();
    return genreDtos.map((genreDto) => new GenreResponse(genreDto));
  }
}

export default GenreController;
