export interface ResponseError {
  err: string,
  data: null
}
export interface ResponseData<T> {
  err: '',
  data: T
}
export interface ResponseDataByPagination<T> {
  err: '',
  data: T[],
  total: number
}
export interface SearchCondition {
  page: number,
  limit: number,
  key: string
}
