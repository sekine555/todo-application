import { Genre } from "./Genre";

export default interface IGenreRepository {
  fetchAll(): Promise<Genre[]>;
}
