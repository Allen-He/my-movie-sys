import axios from "axios";
import { ResponseData, ResponseDataByPagination, ResponseError, SearchCondition } from "./CommonTypes";

export interface Movie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  duration: number;
  isComing: boolean;
  isHot: boolean;
  isClassic: boolean;
  desc?: string;
  poster?: string;
}

export default class MovieService {
  public static async add(movie: Movie): Promise<ResponseData<Movie> | ResponseError> {
    const { data } = await axios.post('/api/movie', movie);
    return data;
  }
  public static async eidt(id: string, movie: Partial<Movie>): Promise<ResponseData<Movie> | ResponseError> {
    const { data } = await axios.put(`/api/movie/${id}`, movie);
    return data;
  }
  public static async delete(id: string): Promise<ResponseData<Movie> | ResponseError> {
    const { data } = await axios.delete(`/api/movie/${id}`);
    return data;
  }
  public static async findById(id: string): Promise<ResponseData<Movie | null>> {
    const { data } = await axios.get(`/api/movie/${id}`);
    return data;
  }
  public static async find(condition: SearchCondition): Promise<ResponseDataByPagination<Movie>> {
    const { data } = await axios.get('/api/movie', {
      params: condition
    });
    return data;
  }
}
