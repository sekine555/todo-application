import { TYPES } from "@/config/types";
import type IHttpClient from "@/infrastructure/client/IHttpClient";
import { validateObject } from "@/utils/validateObject";
import { getDefaultRequestInit } from "../helpers/requestInit";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import IGenreClient from "./IGenreClient";
import {
  GetGenreResponse,
  GenreResponse,
} from "@/types/API/genre/GenreResponse";

@injectable()
class GenreClient implements IGenreClient {
  private client: IHttpClient;

  constructor(
    @inject(TYPES.IHttpClient)
    client: IHttpClient,
  ) {
    this.client = client;
  }

  public async fetchGenres(): Promise<GenreResponse[]> {
    return await this.client
      .get<GenreResponse[]>("/api/v1/genres")
      .then((res) => {
        return Promise.all(
          res.data.map((genreResponse) => {
            const getGenreResponse = new GetGenreResponse(genreResponse);
            return validateObject(getGenreResponse);
          }),
        );
      });
  }
}

export default GenreClient;
