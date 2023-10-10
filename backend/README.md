# バックエンド

## 環境構築

### 環境設定ファイル作成

- .env 作成

  `cp .env.sample .env`

### Docker データベース作成

- MySQL 構築

  `make db`

### ライブラリセットアップ

- インストール

  `npm install`

  - 初回もしくは`package.json`のライブラリに更新があった場合に実行が必要

## アプリケーション起動

- 開発モード起動

  `npm run dev`

  http://localhost:8080
