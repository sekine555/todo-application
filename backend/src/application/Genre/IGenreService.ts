import { GenreDto } from "./GenreDto";

export default interface IGenreService {
  getAll(): Promise<GenreDto[]>;
}
