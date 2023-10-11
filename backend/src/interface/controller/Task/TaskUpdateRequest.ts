import { TaskBaseRequest } from "./TaskBaseRequest";

export class TaskUpdateRequest extends TaskBaseRequest {
  constructor(genreId: number, name: string, status: number) {
    super(genreId, name, status);
  }
}
