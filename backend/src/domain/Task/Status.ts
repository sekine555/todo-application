/**
 * タスクのステータスの値オブジェクト
 */
export class Status {
  private readonly _value: number;

  constructor(value: number) {
    if (value !== 0 && value !== 1) {
      throw new Error(
        "ステータスは0（未完了）もしくは1（完了）である必要があります"
      );
    }
    this._value = value;
  }

  public getValue(): number {
    return this._value;
  }

  public isCompleted(): boolean {
    return this._value === 1;
  }

  public isInProgress(): boolean {
    return this._value === 0;
  }
}
