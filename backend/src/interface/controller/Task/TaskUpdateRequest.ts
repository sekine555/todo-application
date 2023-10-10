import { IsInt, IsNotEmpty, Min } from "class-validator";
import { TaskBaseRequest } from "./TaskBaseRequest";

export class TaskUpdateRequest extends TaskBaseRequest {
  constructor(id: number, genreId: number, name: string, status: number) {
    super(genreId, name, status);
    this.id = id;
  }

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
