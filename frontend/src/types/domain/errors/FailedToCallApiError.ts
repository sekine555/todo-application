import BaseError from "./BaseError";

export type FailedToCallApiErrorParams = [
  string, // エラーメッセージ
  number | undefined, // HTTPレスポンスステータス
  boolean, // 準正常系判定（True：準正常系のエラー）
  string, // エラー理由
  string, // エンドポイント名
];

class FailedToCallApiError extends BaseError {
  constructor(
    message?: string,
    public statusCode?: number,
    public isSemiNormalStatusError?: boolean,
    public errorReason?: string,
    public path?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isSemiNormalStatusError = isSemiNormalStatusError;
    this.errorReason = errorReason;
    this.path = path;
  }
}

export default FailedToCallApiError;
