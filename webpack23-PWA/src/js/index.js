// import '@babel/polyfill'
import '../css/index.less';
import { sub } from './test';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了！');
    resolve();
  }, 1000);
});

console.log(promise);
console.log(sub(5, 2));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('sw注册成功了~');
    }).catch(() => {
      console.log('sw注册失败了~');
    });
  });
}
