class BaseError extends Error {
  public statusCode?: number;

  constructor(message?: string) {
    super(message);
    this.name = new.target.name;

    // (see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BaseError;
