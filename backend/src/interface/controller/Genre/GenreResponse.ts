import { GenreDto } from "@/application/Genre/GenreDto";

export class GenreResponse {
  constructor(genreDto: GenreDto) {
    this.id = genreDto.id;
    this.name = genreDto.name;
  }

  public readonly id: number;
  public readonly name: string;
}
