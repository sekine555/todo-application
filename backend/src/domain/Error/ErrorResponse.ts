export class ErrorResponse {
  constructor(
    private statusCode: number,
    private reason: string,
    private errors: ErrorDetail[],
    private path: string
  ) {}

  public get getStatusCode(): number {
    return this.statusCode;
  }
  public get getReason(): string {
    return this.reason;
  }
  public get getErrors(): ErrorDetail[] {
    return this.errors;
  }
  public get getPath(): string {
    return this.path;
  }
}

export class ErrorDetail {
  constructor(private code: string = null, private message: string = null) {}
}
