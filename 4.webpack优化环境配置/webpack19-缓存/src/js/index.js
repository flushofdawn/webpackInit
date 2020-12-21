// import '@babel/polyfill'
import '../css/index.less';

const add = (x, y) => x + y;

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了！');
    resolve();
  }, 1000);
});

console.log(promise);
console.log(add(5, 2));
