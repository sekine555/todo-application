import { TaskEntity } from "@/infrastructure/entity/TaskEntity";
import { Genre } from "../Genre/Genre";
import { Status } from "./Status";

export class Task {
  constructor(taskEntity: TaskEntity) {
    this.id = taskEntity.id;
    this.name = taskEntity.name;
    this.status = new Status(taskEntity.status);
    this.registrationDate = taskEntity.createdAt;
    this.lastModifiedDate = taskEntity.updatedAt;
    this.genre = new Genre(taskEntity.genre);
  }

  public id: number;
  public name: string;
  public status: Status;
  public registrationDate: Date;
  public lastModifiedDate: Date;
  public genre: Genre;
}
