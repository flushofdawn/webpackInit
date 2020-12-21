// import '@babel/polyfill' 
import { sub } from './test.js'

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了！');
    resolve();
  }, 1000);
});

console.log(promise);
console.log(sub(5, 2));
