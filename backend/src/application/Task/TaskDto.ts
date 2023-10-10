import { Task } from "@/domain/Task/Task";
import { GenreDto } from "../Genre/GenreDto";

export class TaskDto {
  constructor(task: Task) {
    this.id = task.id;
    this.name = task.name;
    this.status = task.status.getValue();
    this.registrationDate = task.registrationDate;
    this.lastModifiedDate = task.lastModifiedDate;
    this.genreDto = new GenreDto(task.genre);
  }

  public id: number;
  public name: string;
  public status: number;
  public registrationDate: Date;
  public lastModifiedDate: Date;
  public genreDto: GenreDto;
}
