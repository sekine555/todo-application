import { Status } from "@/domain/Task/Status";
import { TaskBaseCommand } from "./TaskBaseCommand";

export class TaskUpdateCommand extends TaskBaseCommand {
  constructor(id: number, genreId: number, name: string, status: number) {
    super(genreId, name, new Status(status));
    this.id = id;
  }

  public id: number;
}
