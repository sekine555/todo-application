import { TYPES } from "@/config/types";
import ITagClient from "./ITagClient";
import type IHttpClient from "@/infrastructure/client/IHttpClient";
import { validateObject } from "@/utils/validateObject";
import { getDefaultRequestInit } from "../helpers/requestInit";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TagResponse, GetTagResponse } from "@/types/API/tag/TagResponse";

@injectable()
class TagClient implements ITagClient {
  private client: IHttpClient;

  constructor(
    @inject(TYPES.IHttpClient)
    client: IHttpClient,
  ) {
    this.client = client;
  }

  public async fetchTagsByGenreId(genreId: number): Promise<TagResponse[]> {
    return await this.client
      .get<TagResponse[]>(`/api/v1/tag/${genreId}`, getDefaultRequestInit())
      .then((res) => {
        return Promise.all(
          res.data.map((tagResponse) => {
            const getTagResponse = new GetTagResponse(tagResponse);
            return validateObject(getTagResponse);
          }),
        );
      });
  }
}

export default TagClient;
