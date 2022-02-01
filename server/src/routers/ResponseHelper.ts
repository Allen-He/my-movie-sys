import { Response } from "express";
import { SearchResult } from "../entities/CommonTypes";

export default class ResponseHelper {
  /** 响应错误信息 */
  public static sendError(error: string | string[], res: Response) {
    let err: string;
    if(Array.isArray(error)) {
      err = error.join(';');
    }else {
      err = error;
    }
    res.send({
      err,
      data: null
    });
  }
  /** 响应普通数据信息 */
  public static sendData(data: any, res: Response) {
    res.send({
      err: '',
      data
    });
  }
  /** 响应分页查询数据信息 */
  public static sendDataByPagination<T>(data: SearchResult<T>, res: Response) {
    if(data.errors.length > 0) {
      this.sendError(data.errors, res);
    } else {
      res.send({
        err: '',
        data: data.data,
        total: data.total
      });
    }
  }
}
