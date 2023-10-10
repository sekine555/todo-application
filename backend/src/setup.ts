import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createRouter } from "@/infrastructure/router";
import { AllExceptionFilter } from "./domain/Error/filter/AllExceptionFilter";

const setup = (server: express.Express): express.Express => {
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(express.json());
  const allowOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
  const corsOptions: cors.CorsOptions = {
    credentials: true, // クロスオリジン(CORS)間でCookieのやりとりを行うため、credentialsを有効にする。
    origin: (origin, callback) => {
      // NOTE: originがundefinedの場合は、同一オリジンからのリクエスト（つまり、リクエストがAPIサーバー自体から来ている）では、
      //       originヘッダを送信しないため、undefinedとなることから、この場合はパスさせる。
      if (origin === undefined || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // 許可されていないオリジンからのリクエストはCORSエラーで返す。
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  server.use(cors(corsOptions));
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-From"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  // Routerの設定
  server.use("/api/v1", createRouter());
  // 共通のエラーハンドリングミドルウェアの設定
  server.use(AllExceptionFilter);

  return server;
};

export default setup;
