import { Loading } from "umi";
import { loginUserModelState } from "./loginUser";
import { MovieModelState } from "./movies";

export interface State {
  loginUser: loginUserModelState,
  movies: MovieModelState,
  loading: Loading
}
