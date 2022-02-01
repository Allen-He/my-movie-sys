import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MovieService from './services/MovieService';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

MovieService.add({
  name: '哈哈哈',
  types: ['爱情'],
  areas: ['成都'],
  duration: 100,
  isComing: false,
  isHot: false,
  isClassic: true
});
// MovieService.eidt("61f903e16a3d2bdfd224641a", {
//   name: '哈哈哈',
//   types: ['爱情'],
//   areas: ['成都'],
//   duration: 100,
// })
// MovieService.delete('61f903e16a3d2bdfd224641a')
// MovieService.findById('61f9070f6a3d2bdfd2246422').then(res => {
//   console.log(res);
// });
// MovieService.find({
//   page: 1,
//   limit: 5,
//   key: '1'
// }).then(res => {
//   console.log(res);
// });
