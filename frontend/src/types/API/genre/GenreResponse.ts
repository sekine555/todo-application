import { IsInt, IsNotEmpty, IsString } from "class-validator";

export interface GenreResponse {
  id: number;
  name: string;
}

export class GetGenreResponse implements GenreResponse {
  constructor(res: GenreResponse) {
    this.id = res.id;
    this.name = res.name;
  }

  @IsNotEmpty()
  @IsInt()
  id: number;
  @IsString()
  @IsString()
  @IsNotEmpty()
  name: string;
}
