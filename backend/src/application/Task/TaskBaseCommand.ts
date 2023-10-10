import { Status } from "@/domain/Task/Status";

export class TaskBaseCommand {
  constructor(genreId: number, name: string, status: Status) {
    this.genreId = genreId;
    this.name = name;
    this.status = status;
  }

  readonly genreId: number;
  readonly name: string;
  readonly status: Status;
}
