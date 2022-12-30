const add = (a, b) => {
  throw Error("test");
  return a + b;
};

console.log(add(2, 4));
console.log(add(3, 3));
