import { IsString, IsNotEmpty, MaxLength, IsInt, Min } from "class-validator";

export class TaskBaseRequest {
  constructor(genreId: number, name: string, status: number) {
    this.genreId = genreId;
    this.name = name;
    this.status = status;
  }

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly genreId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly status: number;
}
