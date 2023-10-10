import { TaskBaseRequest } from "./TaskBaseRequest";

export class TaskCreateRequest extends TaskBaseRequest {
  constructor(genreId: number, name: string, status: number) {
    super(genreId, name, status);
  }
}
