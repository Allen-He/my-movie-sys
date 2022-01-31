/** 数据查询结果 */
export interface SearchResult<T> {
  total: number, // 查询的数据总数
  data: T[], // 查询的数据
  errors: string[] // 查询过程中出现的错误
}
