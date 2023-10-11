export interface ErrorResponse<T = any> extends Error {
  message: string;
  statusCode: number;
  errorReason: string;
  path: string;
}
