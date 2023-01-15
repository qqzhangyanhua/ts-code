var deleteGreatestValue = function (grid) {
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    grid[i].sort((a, b) => b - a);
  }
  while (grid[0].length) {
    let val = 0;
    for (let i = 0; i < grid.length; i++) {
      val = Math.max(val, grid[i].shift());
    }
    res += val;
  }
  console.log(grid);

  return res;
};
let result = deleteGreatestValue([
  [1, 2, 4],
  [3, 3, 1],
]);
console.log("result", result);
