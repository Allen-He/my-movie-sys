import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Movie } from "./entities/Movie";

// const m = new Movie();
// m.name = '只有芸知道';
// m.types = ['爱情'];
// m.areas = ['成都'];
// m.duration = 100;

// validate(m).then(res => {
//   console.log(res);
// })

const m: any = {
  name: 123,
  types: ['爱情'],
  areas: ['成都'],
  duration: 100,
  isHot: true
};

const mObj = plainToClass(Movie, m);

validate(mObj).then(res => {
  console.log(res);
})
