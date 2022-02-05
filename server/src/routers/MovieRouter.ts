import express from "express";
import MovieService from "../services/MovieService";
import ResponseHelper from "./ResponseHelper";

const movieRouter = express.Router();

/** 获取电影的“类型、地区”取值 */
movieRouter.get('/extra', async (req, res) => {
  const result = await MovieService.getExtraInfo();
  ResponseHelper.sendData(result, res);
})

movieRouter.get('/:id', async (req, res) => {
  try {
    const moiveId = req.params.id;
    const result = await MovieService.findById(moiveId);
    ResponseHelper.sendData(result, res);
  } catch (err) { // 查询失败导致出现错误，返回null
    ResponseHelper.sendData(null, res);
  }
});

movieRouter.get('/', async (req, res) => {
  const result = await MovieService.find(req.query as any);
  ResponseHelper.sendDataByPagination(result, res);
});

movieRouter.post('/', async (req, res) => {
  const result = await MovieService.add(req.body);
  if(Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  }else {
    ResponseHelper.sendData(result, res);
  }
})

movieRouter.put('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const result = await MovieService.edit(movieId, req.body);
    if(result.length > 0) {
      ResponseHelper.sendError(result, res);
    }else {
      ResponseHelper.sendData(true, res);
    }
  } catch (err) {
    ResponseHelper.sendError('电影id不正确', res);
  }
})

movieRouter.delete('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    await MovieService.delete(movieId);
    ResponseHelper.sendData(true, res);
  } catch (err) {
    ResponseHelper.sendError('电影id不正确', res);
  }
})

export default movieRouter;
