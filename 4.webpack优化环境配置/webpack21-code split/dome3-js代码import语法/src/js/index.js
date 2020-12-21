// import '@babel/polyfill'  

/* 
    通过js代码,让某个文件被单独打包成一个chunk
    import 动态导入语法：能将某个文件单独打包 
*/
import('./test').then(({ add, sub }) => {
  console.log(add(2, 5));
  console.log(sub);
})

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了！');
    resolve();
  }, 1000);
});

console.log(promise); 
