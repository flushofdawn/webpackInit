console.log("sub文件被加载了");

export function sub (a, b) {
  const arr = [];
  arr.push(a, b);
  return arr[0] - arr[1];
} 
