import '../css/index.less'
import '../asset/font/iconfont.css'
import output from './other'

function add (a, b) {
  return a + b
}

output();
console.log(add(1, 2))


if (module.hot) {
  module.hot.accept('./other.js', function () {
    output();
  })
}
