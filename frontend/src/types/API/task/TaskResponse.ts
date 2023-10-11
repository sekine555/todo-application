import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import {
  GenreResponse,
  GetGenreResponse,
} from "@/types/API/genre/GenreResponse";

export interface TaskResponse {
  id: number;
  name: string;
  status: number;
  registrationDate: string;
  lastModifiedDate?: string;
  genre: GenreResponse;
}

export class GetTaskResponse implements TaskResponse {
  constructor(res: TaskResponse) {
    this.id = res.id;
    this.name = res.name;
    this.status = res.status;
    this.registrationDate = res.registrationDate;
    this.lastModifiedDate = res.lastModifiedDate;
    this.genre = res.genre;
  }

  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  registrationDate: string;

  @IsString()
  @IsOptional()
  lastModifiedDate?: string;

  @ValidateNested()
  @Type(() => GetGenreResponse)
  genre: GenreResponse;
}
