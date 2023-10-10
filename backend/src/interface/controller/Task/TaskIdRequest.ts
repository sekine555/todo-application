import { IsInt, IsNotEmpty, Min } from "class-validator";

export class TaskIdRequest {
  constructor(id: number) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
