// import '@babel/polyfill' 
console.log('index.js被加载了');
//  import { add } from './test'   
document.getElementById("btn1").onclick = function () {
  // 懒加载    （ 多次点击 并不会重复加载，第二次加载 就会读取浏览器缓存 所以不用担心重复加载的问题 ）
  // 注意！！！  有个坑  webpackChunkName: "test"   键名后面的冒号 一定要贴紧 否则 失效

  import(/* webpackChunkName: 'sub' */'./sub').then(({ sub }) => {
    console.log('懒加载' + sub(1, 2));
  })
}

document.getElementById("btn2").onclick = function () {
  /*
     预加载 Prefetch:  首次进入页面 等待其他资源加载完毕，浏览器空闲了，再加载 设置了预加载 的内容  （优点）
              只兼容PC端高版本浏览器，移动端 IE 等低版本浏览器 请慎用   (缺点)

     正常加载 可以认为是 并行 加载（5-6个文件 --> http协议 ）（ 同一时间加载多个文件 ）
      
  */


  import(/* webpackChunkName: 'add',webpackPrefetch: true */'./add').then(({ add }) => {

    console.log('预加载' + add(1, 2));
  })
}
