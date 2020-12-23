// import add from './add'
import count from './count'

console.log('index.js被加载了')

import(/* webpackChunkName: 'sub' */'./add.js').then(({ default: add }) => {
  console.log(add(1, 2))
})
// console.log(add(2, 4))
// console.log(count(5, 4)) 
