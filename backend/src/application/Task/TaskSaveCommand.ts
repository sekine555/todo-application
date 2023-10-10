export class TaskSaveCommand {
  constructor(genreId: number, name: string, status: number) {
    this.genreId = genreId;
    this.name = name;
    this.status = status;
  }

  readonly genreId: number;
  readonly name: string;
  readonly status: number;
}
