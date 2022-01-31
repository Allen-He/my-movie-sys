import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";

Mongoose.connect('mongodb://localhost:27017/my-movie-sys').then(res => {
  console.log('MongoDB数据库连接成功');
});

export { MovieModel };
