import dotenv from "dotenv";
dotenv.config(); // .envの内容をprocess.envに反映させる機構は、この行で実施しないとアプリケーション全体で使用q

import express from "express";
import http from "http";
import setup from "./setup";

const server: http.Server = http.createServer(setup(express()));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`api server listening on port ${port}`);
});
