import { TaskDto } from "@/application/task/TaskDto";
import { GenreResponse } from "../Genre/GenreResponse";

export class TaskResponse {
  constructor(taskDto: TaskDto) {
    this.id = taskDto.id;
    this.name = taskDto.name;
    this.status = taskDto.status;
    this.registrationDate = taskDto.registrationDate;
    this.lastModifiedDate = taskDto.lastModifiedDate;
    this.genre = new GenreResponse(taskDto.genreDto);
  }

  public readonly id: number;
  public readonly name: string;
  public readonly status: number;
  public readonly registrationDate: Date;
  public readonly lastModifiedDate: Date;
  public readonly genre: GenreResponse;
}
