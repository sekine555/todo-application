import { Status } from "@/domain/Task/Status";
import { TaskBaseCommand } from "./TaskBaseCommand";

export class TaskCreateCommand extends TaskBaseCommand {
  constructor(genreId: number, name: string, status: number) {
    super(genreId, name, new Status(status));
  }
}
