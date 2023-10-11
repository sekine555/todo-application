import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import type { ResponseType } from "./IHttpClient";
import IHttpClient from "./IHttpClient";
import type IHttpClientHelper from "./IHttpClientHelper";

@injectable()
class HttpClient implements IHttpClient {
  private helper: IHttpClientHelper;

  constructor(@inject(TYPES.IHttpClientHelper) helper: IHttpClientHelper) {
    this.helper = helper;
  }

  private BASE_URL = process.env.NEXT_PUBLIC_BE_ENDPOINT;

  private async formatResponse<T>(
    res: Response,
    resType: ResponseType,
  ): Promise<{
    data: T;
    statusCode: number;
  }> {
    switch (resType) {
      case "json":
        return { data: await res.json(), statusCode: res.status };
      case "text":
        return {
          data: (await res.text()) as unknown as T,
          statusCode: res.status,
        };
    }
  }

  private getRequestInit(options?: RequestInit): RequestInit {
    const defaultRequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // ヘッダーの指定があった場合はマージする
    return options?.headers
      ? {
          ...options,
          headers: {
            ...defaultRequestInit.headers,
            ...options.headers,
          },
        }
      : {
          ...defaultRequestInit,
          ...options,
        };
  }

  public async get<T>(
    path: string,
    options?: RequestInit,
    responseType: ResponseType = "json",
  ) {
    try {
      const res = await fetch(`${this.BASE_URL}${path}`, {
        ...this.getRequestInit(options),
      });
      const result = await this.helper.handleExceptNormal(res);
      // NOTES: 200番代以外は一旦全てエラー判定としている
      if (result.isFailure()) {
        throw result.value;
      }
      return await this.formatResponse<T>(res, responseType);
    } catch (error) {
      // 例外が出た場合は全てエラー判定
      const result = await this.helper.handleError(error);
      throw result.value;
    }
  }

  public async post<T>(
    path: string,
    body: object | string,
    options?: RequestInit,
    responseType: ResponseType = "json",
  ) {
    const reqBody = body instanceof Object ? JSON.stringify(body) : body;
    try {
      const res = await fetch(`${this.BASE_URL}${path}`, {
        method: "POST",
        body: reqBody,
        ...this.getRequestInit(options),
      });
      const result = await this.helper.handleExceptNormal(res);
      if (result.isFailure()) {
        throw result.value;
      }
      return await this.formatResponse<T>(res, responseType);
    } catch (error) {
      const result = await this.helper.handleError(error);
      throw result.value;
    }
  }

  async put<T>(
    path: string,
    body: object,
    options?: RequestInit,
    responseType: ResponseType = "json",
  ) {
    try {
      const res = await fetch(`${this.BASE_URL}${path}`, {
        method: "PUT",
        body: JSON.stringify(body),
        ...this.getRequestInit(options),
      });
      const result = await this.helper.handleExceptNormal(res);
      if (result.isFailure()) {
        throw result.value;
      }
      return await this.formatResponse<T>(res, responseType);
    } catch (error) {
      const result = await this.helper.handleError(error);
      throw result.value;
    }
  }

  async patch<T>(
    path: string,
    body: object,
    options?: RequestInit,
    responseType: ResponseType = "json",
  ) {
    try {
      const res = await fetch(`${this.BASE_URL}${path}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        ...this.getRequestInit(options),
      });
      const result = await this.helper.handleExceptNormal(res);
      if (result.isFailure()) {
        throw result.value;
      }
      return await this.formatResponse<T>(res, responseType);
    } catch (error) {
      const result = await this.helper.handleError(error);
      throw result.value;
    }
  }

  async delete<T>(
    path: string,
    options?: RequestInit,
    responseType: ResponseType = "json",
  ) {
    try {
      const res = await fetch(`${this.BASE_URL}${path}`, {
        method: "DELETE",
        ...this.getRequestInit(options),
      });
      const result = await this.helper.handleExceptNormal(res);
      if (result.isFailure()) {
        throw result.value;
      }
      return await this.formatResponse<T>(res, responseType);
    } catch (error) {
      const result = await this.helper.handleError(error);
      throw result.value;
    }
  }
}

export default HttpClient;
