import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  Repository,
} from "typeorm";

/**
 * MySQLの基本的な操作を行う共通クラス
 */
export abstract class BaseMySqlOperations<T> {
  protected entityTarget: EntityTarget<T>;

  constructor(entityTarget: EntityTarget<T>) {
    this.entityTarget = entityTarget;
  }

  /**
   * リポジトリを取得する
   * @note
   * - EntityManagerを引数で受け取ることで、呼び出し元のトランザクション内でリポジトリを取得できる
   *
   * @param entityManager
   * @returns
   */
  public async getRepository(
    entityManager: EntityManager
  ): Promise<Repository<T>> {
    return entityManager.getRepository(this.entityTarget);
  }

  /**
   * リポジトリの全件取得を行う
   * @param entityManager
   * @param options
   * @returns
   */
  public async fetchAll(
    entityManager: EntityManager,
    options: FindManyOptions<T>
  ): Promise<T[]> {
    const repository = await this.getRepository(entityManager);
    return repository.find(options);
  }
}
