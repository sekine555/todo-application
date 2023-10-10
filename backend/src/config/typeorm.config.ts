import { DataSource } from "typeorm";
import path from "path";

export const createDataSource = (): DataSource => {
  return new DataSource({
    name: "todo",
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(String(process.env.MYSQL_PORT), 10),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 90000, // デフォルトのタイムアウト時間の場合、「Error: Handshake inactivity timeout」が発生したため、明示的に指定している
    synchronize: false,
    logging: false, // SQL文の出力するかどうか
    entities: [path.join(__dirname, "../infrastructure/entity", "*.*")],
    migrations: [],
    subscribers: [],
    extra: {
      connectAttributes: {
        program_name: "TypeORM", // sys.sessionのprogram_nameに表示される文字列
      },
    },
  });
};

export const dataSource = createDataSource();
