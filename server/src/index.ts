import "reflect-metadata";
import express from "express";
import movieRouter from "./routers/MovieRouter";
import UploadRouter from "./routers/UploadRouter";
import history from "connect-history-api-fallback";

const app = express();

app.use(history()); //解决“单页应用子页面刷新会出现白屏”的问题
app.use('/upload', express.static('public/upload')); // 相对于进程运行的根路径
app.use('/', express.static('public/client'));
app.use(express.json()); // 解析json格式的请求体

app.use('/api/movie', movieRouter);
app.use('/api/upload', UploadRouter);


app.listen(3000, () => {
  console.log('正在监听3000端口');
})



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

// const m2 = new Movie();
// m2.name = '只有芸知道';
// m2.types = ['爱情'];
// m2.areas = ['成都'];
// // m2.duration = 100;

// MovieService.add(m2).then(res => {
//   console.log(res);
// })

// const m: any = {
//   name: 123,
//   types: ['爱情'],
//   areas: ['成都'],
//   duration: 100,
//   isHot: true
// };
// MovieService.add(m).then(res => {
//   console.log(res);
// })
// const m3: any = {
//   name: 'xxxxx',
// }
// MovieService.edit('61f7abdb01167a5f1e68ee56', m3).then(res => console.log(res))

// MovieService.delete('61f7b049d43363e492547ade').then(res => console.log(res))

// MovieService.findById('61f7abdb01167a5f1e68ee55').then(res => console.log(res));

// const condi: any = {
//   page: 3,
//   limit: 5,
//   key: ''
// }
// MovieService.find(condi).then(res => console.log(res, '----', res.data.length));

