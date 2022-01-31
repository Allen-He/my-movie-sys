import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import Movie from "../entities/Movie";

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
}
