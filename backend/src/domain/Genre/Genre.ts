import { GenreEntity } from "@/infrastructure/entity/GenreEntity";

export class Genre {
  constructor(genreEntity: GenreEntity) {
    this.id = genreEntity.id;
    this.name = genreEntity.name;
  }

  public id: number;
  public name: string;
}
