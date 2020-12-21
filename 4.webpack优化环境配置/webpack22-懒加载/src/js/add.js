console.log("add文件被加载了");

export function add (a, b) {
  const arr = [];
  arr.push(a, b);
  return arr[0] + arr[1];
} 
