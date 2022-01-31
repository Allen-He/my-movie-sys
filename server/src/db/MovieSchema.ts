import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

export interface IMovie extends Movie, Mongoose.Document {}

const movieSchema = new Mongoose.Schema<IMovie>({
  name: String,
  types: [String],
  areas: [String],
  duration: Number,
  isComing: Boolean,
  isHot: Boolean,
  isClassic: Boolean,
  desc: String,
  poster: String
}, {
  versionKey: false,
});

export default Mongoose.model<IMovie>('Movie', movieSchema);
