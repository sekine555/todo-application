import { injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
class DataSourceManager {
  private _dataSource: DataSource;

  constructor(private dataSource: DataSource) {
    this._dataSource = dataSource;
  }

  public async initialize(): Promise<DataSource> {
    return await this._dataSource.initialize();
  }

  public async destroy(): Promise<void> {
    await this._dataSource.destroy();
  }
}

export default DataSourceManager;
