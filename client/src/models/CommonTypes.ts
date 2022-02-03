import { loginUserModelType } from "umi";
import { MovieModelState } from "./movies";

export interface State {
  loginUser: loginUserModelType,
  movies: MovieModelState
}
