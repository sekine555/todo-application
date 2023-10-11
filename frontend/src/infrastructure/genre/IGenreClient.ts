import { GenreResponse } from "@/types/API/genre/GenreResponse";

interface IGenreClient {
  fetchGenres(): Promise<GenreResponse[]>;
}

export default IGenreClient;
