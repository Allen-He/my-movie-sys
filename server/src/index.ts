import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Movie } from "./entities/Movie";
import { MovieModel } from "./db";


// function getRandomNum(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// for (let i = 0; i < 100; i++) {
//   const m = {
//     name: '电影' + i,
//     types: ['爱情', '励志', '文艺'].slice(getRandomNum(0, 2)),
//     areas: ['成都', '上海', '北京'].slice(getRandomNum(0, 2)),
//     duration: getRandomNum(60, 200),
//     isHot: Math.random() < 0.5,
//     isComing: Math.random() < 0.5,
//     isClassic: Math.random() < 0.5,
//     desc: 'hhhhxxxxhhhh',
//     poster: ''
//   };
//   const mObj = plainToClass(Movie, m);
//   validate(mObj).then(res => {
//     if(res.length === 0) {
//       const data = new MovieModel(mObj);
//       data.save().then(() => console.log(mObj.name + '：添加成功'));
//     }else {
//       console.error(mObj.name + '：添加失败');
//     }
//   });
// }



// const m = new Movie();
// m.name = '只有芸知道';
// m.types = ['爱情'];
// m.areas = ['成都'];
// m.duration = 100;

// validate(m).then(res => {
//   console.log(res);
// })

// const m: any = {
//   name: 123,
//   types: ['爱情'],
//   areas: ['成都'],
//   duration: 100,
//   isHot: true
// };

// const mObj = plainToClass(Movie, m);

// validate(mObj).then(res => {
//   console.log(res);
// })
