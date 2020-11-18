/* 
  index.js : webpack 入口起点文件

  webpack ./src/index.js -o ./build/built.js --mode=development
  webpack ./src/index.js -o ./build/built.js --mode=production

*/

function add (x, y) {
  return x + y
}
console.log(add(2, 5))
