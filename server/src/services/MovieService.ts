import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import { SearchResult } from "../entities/CommonTypes";
import Movie from "../entities/Movie";
import SearchCondition from "../entities/SearchCondition";

export default class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 处理plainObject的转换
    const movieObj = Movie.transform(movie);
    // 数据验证
    const errors = await movieObj.validateThis();
    if(errors.length > 0) {
      return errors;
    }
    // 添加到数据库
    return await MovieModel.create(movieObj);
  }
  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 处理plainObject的转换
    const movieObj = Movie.transform(movie);
    // 数据验证
    const errors = await movieObj.validateThis(true);
    if(errors.length > 0) {
      return errors;
    }
    // 添加到数据库
    await MovieModel.updateOne({ _id: id }, movie);
    return [];
  }
  public static async delete(id: string): Promise<boolean> {
    const res = await MovieModel.deleteOne({_id: id});
    return res.deletedCount !== 0;
  }
  public static async findById(id: string): Promise<IMovie | null> {
    return await MovieModel.findById(id);
  }
  /** 根据条件对电影名称进行分页模糊查询 */
  public static async find(condition: SearchCondition): Promise<SearchResult<Movie>> {
    // 处理plainObject的转换
    const conditionObj = SearchCondition.transform(condition);
    // 数据验证
    const errors = await conditionObj.validateThis();
    if(errors.length > 0) {
      return {
        total: 0,
        data: [],
        errors
      };
    }
    // 添加到数据库
    const { key, page, limit } = conditionObj;
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(key)}
    }).skip((page - 1) * limit).limit(limit).sort({name: 1});
    const total = await MovieModel.find({
      name: { $regex: new RegExp(key)}
    }).countDocuments();
    return {
      total,
      data: movies,
      errors: []
    }
  }
}
