import { Genre } from "@/domain/Genre/Genre";

export class GenreDto {
  constructor(genre: Genre) {
    this.id = genre.id;
    this.name = genre.name;
  }

  public id: number;
  public name: string;
}
